package com.resourcify.service;

import com.resourcify.common.client.NotificationClient;
import com.resourcify.common.exception.BadRequestException;
import com.resourcify.common.exception.NotFoundException;
import com.resourcify.common.model.NotificationMessage;
import com.resourcify.common.utils.DateTimeUtils;
import com.resourcify.common.utils.JwtUtils;
import com.resourcify.common.utils.LoggingUtil;
import com.resourcify.mapper.ReservationMapper;
import com.resourcify.model.entity.Reservation;
import com.resourcify.model.entity.Resource;
import com.resourcify.model.request.ReserveResourceRequest;
import com.resourcify.model.request.StatusRequest;
import com.resourcify.model.response.ReservationResponse;
import com.resourcify.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class ResourceReservationService {

    private final ResourceRepository resourceRepository;
    private final UserService userService;
    private final NotificationClient notificationClient;

    private final ReservationMapper reservationMapper;

    public ReservationResponse reserveResource(ReserveResourceRequest reserveResourceReq, Jwt jwt) {
        JwtUtils.isRequestForUserValid(jwt, reserveResourceReq.getForUserId());
        if (!DateTimeUtils.isAtLeast12HoursFromNow(reserveResourceReq.getFromDate())) {
            throw new BadRequestException("Time difference has to be at least " + DateTimeUtils.TIME_DIFFERENCE + "h");
        }
        Resource resource = resourceRepository.findById(reserveResourceReq.getResourceId())
                .orElseThrow(() -> new NotFoundException(Resource.class, reserveResourceReq.getResourceId()));

        // TODO: check if enough amount

        //         Long amountUsed = resource.getReservations()
        //                 .stream()
        //                 .filter(reservation -> reservation.getReservationDate()
        //                         .toLocalDate()
        //                         .equals(reserveResourceReq.getFromDate().toLocalDate()))
        //                 .count();
        //
        //         if (resource.getAmount() <= amountUsed) {
        //             throw new BadRequestException("That resource is fully reserved on that date");
        //         }

        userService.getUserById(reserveResourceReq.getForUserId()); // check if user exist

        Reservation reservation = reservationMapper.fromRequest(reserveResourceReq, jwt);
        resource.getReservations().add(reservation);
        resource = resourceRepository.save(resource);

        try {
            NotificationMessage message = new NotificationMessage();
            this.notificationClient.sendNewReservationNotificationMessage(message);
        } catch (Exception ex) {
            LoggingUtil.logException(ex, NotificationClient.class);
        }

        return reservationMapper.toReservationResponse(resource.getName(), reservation);
    }

    public ReservationResponse updateReserveResource(String reservationId, ReserveResourceRequest resourceRequest) {
        String resourceId = resourceRequest.getResourceId();
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new NotFoundException(Resource.class, resourceId));

        // TODO: if changing resource need more to do
        Reservation reservation = resource.getReservations()
                .stream()
                .filter(x -> x.getReservationId().equals(reservationId))
                .findAny()
                .orElseThrow(() -> new NotFoundException(Reservation.class, reservationId));

        reservation.setForUserId(resourceRequest.getForUserId());
        reservation.setDescription(resourceRequest.getDescription());
        reservation.setFromDate(resourceRequest.getFromDate());
        reservation.setToDate(resourceRequest.getToDate());
        resource = resourceRepository.save(resource);
        return reservationMapper.toReservationResponse(resource.getName(), reservation);
    }

    public ReservationResponse handleResourceReservationApproval(String resourceId,
                                                                 String reservationId,
                                                                 StatusRequest status) {
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new NotFoundException(Resource.class, resourceId));
        Reservation reservation = resource.getReservations()
                .stream()
                .filter(res -> res.getReservationId().equals(reservationId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(Reservation.class, reservationId));

        reservation.setStatus(status.getStatus());
        resource = resourceRepository.save(resource);
        ReservationResponse reservationResponse = reservationMapper.toReservationResponse(resource.getName(),
                reservation);

        try {
            NotificationMessage message = getNotificationMessage(reservationResponse, resource);
            this.notificationClient.sendNotificationMessage(message);
        } catch (Exception ex) {
            LoggingUtil.logException(ex, NotificationClient.class);
        }

        return reservationResponse;
    }

    private NotificationMessage getNotificationMessage(ReservationResponse reservationResponse, Resource resource) {
        String username = reservationResponse.getUser().getUsername();
        String resourceName = resource.getName();
        String statusMessage = switch (reservationResponse.getStatus()) {
            case PENDING -> "pending";
            case APPROVED -> "approved";
            case DECLINED -> "declined";
        };
        String messageText = "Resource (" + resourceName + ") reservation has been " + statusMessage;
        NotificationMessage message = new NotificationMessage(username, messageText, reservationResponse.getStatus());
        return message;
    }

    public void deleteReservation(String resourceId, String reservationId, Jwt jwt) {
        Resource resource = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new NotFoundException(Resource.class, resourceId));

        Reservation reservation = resource.getReservations()
                .stream()
                .filter(res -> res.getReservationId().equals(reservationId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(Reservation.class, reservationId));

        JwtUtils.isRequestForUserValid(jwt, reservation.getForUserId());

        List<Reservation> newReservations = resource.getReservations()
                .stream()
                .filter(x -> !x.getReservationId().equals(reservationId))
                .toList();
        resource.setReservations(newReservations);

        resourceRepository.save(resource);
    }

}

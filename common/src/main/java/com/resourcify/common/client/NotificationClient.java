package com.resourcify.common.client;

import com.resourcify.common.model.NotificationMessage;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "${feign.notification-service.name}", url = "${feign.notification-service.url}")
public interface NotificationClient {

  @PostMapping("ws/notifications")
  void sendNotificationMessage(@Valid @RequestBody NotificationMessage notificationMessage);

  @PostMapping("ws/notifications/admin")
  void sendNewReservationNotificationMessage(@Valid @RequestBody NotificationMessage notificationMessage);
}

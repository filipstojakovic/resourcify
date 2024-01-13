package com.resourcify.service;

import com.resourcify.common.exception.NotFoundException;
import com.resourcify.mapper.ResourceMapper;
import com.resourcify.model.entity.Resource;
import com.resourcify.model.request.ResourceRequest;
import com.resourcify.model.response.ResourceResponse;
import com.resourcify.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class ResourceService {

    public final ResourceRepository resourceRepository;
    private final ResourceMapper resourceMapper;

    // TODO: remove !isActive reservations
    public List<ResourceResponse> findAll(boolean isAdmin) {
        List<Resource> resources = resourceRepository.findAll();
        return resources.stream().map(resource -> resourceMapper.toResponse(resource, isAdmin)).toList();
    }

    public ResourceResponse findById(String id, boolean isAdmin) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Resource.class, id));
        return resourceMapper.toResponse(resource, isAdmin);
    }

    public ResourceResponse insert(ResourceRequest resourceRequest) {
        Resource resource = resourceMapper.fromRequest(resourceRequest);
        resource = resourceRepository.save(resource);
        return resourceMapper.toResponse(resource);
    }

    public ResourceResponse update(String id, ResourceRequest resourceRequest) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Resource.class, id));
        resource.setName(resourceRequest.getName());
        resource.setDescription(resourceRequest.getDescription());
        resource.setAmount(resourceRequest.getAmount());
        resource.setBackgroundColor(resourceRequest.getBackgroundColor());
        resource = resourceRepository.save(resource);
        return resourceMapper.toResponse(resource);
    }

    public void delete(String id) {
        if (!resourceRepository.existsById(id)) {
            throw new NotFoundException(Resource.class, id);
        }
        resourceRepository.deleteById(id);
    }
}

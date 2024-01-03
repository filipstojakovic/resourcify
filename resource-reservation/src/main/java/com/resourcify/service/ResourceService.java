package com.resourcify.service;

import com.resourcify.common.exception.NotFoundException;
import com.resourcify.model.Resource;
import com.resourcify.model.request.ResourceRequest;
import com.resourcify.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class ResourceService {

  public final ResourceRepository resourceRepository;
  private final ModelMapper modelMapper;

  public List<Resource> findAll() {
    return resourceRepository.findAll();
  }

  public Resource findById(String id) {
    return resourceRepository.findById(id)
        .orElseThrow(() -> new NotFoundException(Resource.class, id));
  }

  public Resource insert(ResourceRequest resourceRequest) {
    Resource resource = modelMapper.map(resourceRequest, Resource.class);
    resource = resourceRepository.save(resource);
    return resource;
  }

  public Resource update(String id, ResourceRequest resourceRequest) {
    Resource resource = findById(id);
    resource.setName(resourceRequest.getName());
    resource.setDescription(resourceRequest.getDescription());
    return resourceRepository.save(resource);
  }

  public void delete(String id) {
    findById(id);
    resourceRepository.deleteById(id);
  }
}

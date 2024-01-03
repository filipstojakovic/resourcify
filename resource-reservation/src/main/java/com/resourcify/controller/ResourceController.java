package com.resourcify.controller;

import com.resourcify.model.Resource;
import com.resourcify.model.request.ResourceRequest;
import com.resourcify.service.ResourceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("resources")
public class ResourceController {

  private final ResourceService resourceService;

  @GetMapping
  public List<Resource> findAll() {
    return resourceService.findAll();
  }

  @GetMapping("{id}")
  public ResponseEntity<Resource> findById(@PathVariable String id) {
    Resource resource = resourceService.findById(id);
    return ResponseEntity.ok(resource);
  }

  @PostMapping
  @PreAuthorize("hasRole('client-admin-role')")
  public ResponseEntity<Resource> insert(@Valid @RequestBody ResourceRequest resourceRequest) {
    Resource resource = resourceService.insert(resourceRequest);
    return ResponseEntity.status(HttpStatus.CREATED).body(resource);
  }

  @PutMapping("{id}")
  @PreAuthorize("hasRole('client-admin-role')")
  public ResponseEntity<Resource> update(@PathVariable String id,
                                         @Valid @RequestBody ResourceRequest resourceRequest) {
    Resource resource = resourceService.update(id, resourceRequest);
    return ResponseEntity.ok(resource);
  }

  @DeleteMapping("{id}")
  @PreAuthorize("hasRole('client-admin-role')")
  public ResponseEntity<Void> delete(@PathVariable String id) {
    resourceService.delete(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}

package com.resourcify.controller;

import com.resourcify.common.utils.JwtUtils;
import com.resourcify.model.request.ResourceRequest;
import com.resourcify.model.response.ResourceResponse;
import com.resourcify.service.ResourceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
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
  public List<ResourceResponse> findAll(@AuthenticationPrincipal Jwt jwt) {
    boolean isAdmin = JwtUtils.hasAdminRole(jwt);
    return resourceService.findAll(isAdmin);
  }

  @GetMapping("{id}")
  public ResponseEntity<ResourceResponse> findById(@PathVariable String id, @AuthenticationPrincipal Jwt jwt) {
    boolean isAdmin = JwtUtils.hasAdminRole(jwt);
    ResourceResponse resource = resourceService.findById(id, isAdmin);
    return ResponseEntity.ok(resource);
  }

  @PreAuthorize("hasRole('client-admin-role')")
  @PostMapping
  public ResponseEntity<ResourceResponse> insert(@Valid @RequestBody ResourceRequest resourceRequest) {
    ResourceResponse resource = resourceService.insert(resourceRequest);
    return ResponseEntity.status(HttpStatus.CREATED).body(resource);
  }

  @PreAuthorize("hasRole('client-admin-role')")
  @PutMapping("{id}")
  public ResponseEntity<ResourceResponse> update(@PathVariable String id,
                                                 @Valid @RequestBody ResourceRequest resourceRequest) {
    ResourceResponse resource = resourceService.update(id, resourceRequest);
    return ResponseEntity.ok(resource);
  }

  @PreAuthorize("hasRole('client-admin-role')")
  @DeleteMapping("{id}")
  public ResponseEntity<Void> delete(@PathVariable String id) {
    resourceService.delete(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}

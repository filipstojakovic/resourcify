package com.resourcify.common.utils;

import com.resourcify.common.exception.BadRequestException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;

import java.util.Collection;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class JwtUtils {

  public static final String ADMIN_ROLE_NAME = "client-admin-role";
  private static final String resourceId = "frontend"; // Keycloak client name for which we add ROLE_ prefix
  private static final String principleAttribute = "preferred_username";

  public static String getUsername(Jwt jwt) {
    String claimName = JwtClaimNames.SUB;
    if (principleAttribute != null) {
      claimName = principleAttribute;
    }
    return jwt.getClaim(claimName);
  }

  public static String getUserId(Jwt jwt) {
    return jwt.getSubject();
  }

  public static Collection<? extends GrantedAuthority> extractResourceRoles(Jwt jwt) {
    if (jwt.getClaim("resource_access") == null) {
      return Set.of();
    }
    Collection<String> resourceRoles = extractRolesFromJwt(jwt);
    return resourceRoles.stream()
        .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
        .collect(Collectors.toSet());
  }

  public static Collection<String> extractRolesFromJwt(Jwt jwt) {
    Map<String, Object> resourceAccess;
    Map<String, Object> resource;
    Collection<String> resourceRoles;
    resourceAccess = jwt.getClaim("resource_access");
    if (resourceAccess.get(resourceId) == null) {
      return Set.of();
    }
    resource = (Map<String, Object>) resourceAccess.get(resourceId);
    return (Collection<String>) resource.get("roles");
  }

  public static boolean hasAdminRole(Jwt jwt) {
    Collection<String> roles = extractRolesFromJwt(jwt);
    return roles.stream().anyMatch(role -> role.equals(ADMIN_ROLE_NAME));
  }

  private static boolean isRequestAllowedForThisUser(Jwt jwt, String userId) {
    if (hasAdminRole(jwt)) {
      return true;
    }
    return getUserId(jwt).equals(userId);
  }

  // admins can do anything, and if users is doing something to himself
  public static void isRequestForUserValid(Jwt jwt, String userId) {
    if (!isRequestAllowedForThisUser(jwt, userId)) {
      throw new BadRequestException("This request is not allowed");
    }
  }
}

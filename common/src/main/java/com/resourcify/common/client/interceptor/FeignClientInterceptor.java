package com.resourcify.common.client.interceptor;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
public class FeignClientInterceptor implements RequestInterceptor {

  private static final String AUTHORIZATION_HEADER = "Authorization";
  private static final String BEARER_TOKEN_TYPE = "Bearer";

  @Override
  public void apply(RequestTemplate template) {
    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = securityContext.getAuthentication();
    if (authentication != null && authentication.getPrincipal() instanceof Jwt jwt) {
      template.header(AUTHORIZATION_HEADER, String.format("%s %s", BEARER_TOKEN_TYPE, jwt.getTokenValue()));
    }
  }
}

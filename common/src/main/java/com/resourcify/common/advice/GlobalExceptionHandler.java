package com.resourcify.common.advice;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resourcify.common.utils.MyUtils;
import feign.FeignException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@RequiredArgsConstructor
@ControllerAdvice
public class GlobalExceptionHandler {

  private final ObjectMapper objectMapper;

  @ExceptionHandler(FeignException.class)
  public ResponseEntity<Object> handleFeignException(FeignException ex, HttpServletRequest request) {
    String message = MyUtils.extractMessageFromResponse(ex.getMessage());
    HttpStatus status = HttpStatus.valueOf(ex.status());
    String path = request.getRequestURI();

    String responseMessage;
    ExceptionMessage exceptionMessage = new ExceptionMessage(ex.status(), message, path);
    try {
      responseMessage = objectMapper.writeValueAsString(exceptionMessage);
    } catch (JsonProcessingException e) {
      responseMessage = "error parsing object to json string";
    }

    return ResponseEntity.status(status).body(responseMessage);
  }
}

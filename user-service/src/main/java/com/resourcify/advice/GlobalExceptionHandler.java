package com.resourcify.advice;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resourcify.exception.HttpException;
import com.resourcify.utils.LoggingUtil;
import com.resourcify.utils.MyUtils;
import feign.FeignException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.HandlerMethod;
import org.yaml.snakeyaml.constructor.DuplicateKeyException;

@RequiredArgsConstructor
@ControllerAdvice
public class GlobalExceptionHandler {

  private final ObjectMapper objectMapper;

  @ExceptionHandler(FeignException.class)
  public ResponseEntity<Object> handleFeignException(FeignException ex, HttpServletRequest request) {
    String message = MyUtils.extractMessageFromResponse(ex.getMessage());
    HttpStatus status = HttpStatus.valueOf(ex.status());
    String path = request.getRequestURI();

    String responseMessage = convertMessageToJson(ex.status(), message, path);

    return ResponseEntity.status(status).body(responseMessage);
  }

  @ExceptionHandler(HttpException.class)
  public final ResponseEntity<Object> handleHttpException(HttpException e, HandlerMethod handlerMethod, HttpServletRequest request) {
    Log log = getLog(handlerMethod);
    log.error(e);
    if (e.getStatus() == null) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    String message = e.getMessage();
    int status = e.getStatus().value();
    String path = request.getRequestURI();

    String responseMessage = convertMessageToJson(status, message, path);

    return ResponseEntity.status(status).body(responseMessage);
  }

  @ExceptionHandler({ MethodArgumentNotValidException.class, HttpMessageNotReadableException.class, DuplicateKeyException.class })
  public final ResponseEntity<Object> handleHttpMessageNotReadable(Exception e,
                                                                   HandlerMethod handlerMethod,
                                                                   HttpServletRequest request) {
    LoggingUtil.logException(e, getLog(handlerMethod));
    String message = "Bad Request";
    if (e instanceof MethodArgumentNotValidException ex) {
      message = ex.getBody().getDetail();
    }
    String responseMessage = convertMessageToJson(HttpStatus.BAD_REQUEST.value(), message, request.getRequestURI());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMessage);
  }

  @ExceptionHandler(Exception.class)
  public final ResponseEntity<Object> handleException(Exception e, HandlerMethod handlerMethod) {
    LoggingUtil.logException(e, getLog(handlerMethod));
    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  private Log getLog(HandlerMethod handlerMethod) {
    return LogFactory.getLog(handlerMethod.getMethod().getDeclaringClass());
  }

  private String convertMessageToJson(Integer status, String message, String path) {
    String responseMessage;
    ExceptionMessage exceptionMessage = new ExceptionMessage(status, message, path);
    try {
      responseMessage = objectMapper.writeValueAsString(exceptionMessage);
    } catch (JsonProcessingException e) {
      responseMessage = "error parsing object to json string";
    }
    return responseMessage;
  }
}

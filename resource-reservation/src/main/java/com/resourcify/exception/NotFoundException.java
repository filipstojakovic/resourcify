package com.resourcify.exception;

import org.springframework.http.HttpStatus;

public class NotFoundException extends HttpException {

  public NotFoundException() {
    super(HttpStatus.NOT_FOUND, null);
  }

  public NotFoundException(Object data) {
    super(HttpStatus.NOT_FOUND, data);
  }

  public NotFoundException(Class<?> clazz, Long id) {
    super(HttpStatus.NOT_FOUND, clazz.getSimpleName() + " with id: " + id + " does not exist");
  }

  public NotFoundException(Class<?> clazz, String id) {
    super(HttpStatus.NOT_FOUND, clazz.getSimpleName() + " with id: " + id + " does not exist");
  }
}

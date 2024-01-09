package com.resourcify.common.advice;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.Instant;

@Getter
@RequiredArgsConstructor
public class ExceptionMessage {

  private final String timestamp = Instant.now().toString();
  private final Integer status;
  private final String message;
  private final String path;
}

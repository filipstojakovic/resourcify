package com.resourcify.common.utils;

import java.time.Duration;
import java.time.LocalDateTime;

public class DateTimeUtils {

  public static final Integer TIME_DIFFERENCE = 12;

  public static boolean isAtLeast12HoursFromNow(LocalDateTime dateTime) {
    Duration duration = Duration.between(LocalDateTime.now(), dateTime);

    return duration.toHours() >= TIME_DIFFERENCE;
  }

}

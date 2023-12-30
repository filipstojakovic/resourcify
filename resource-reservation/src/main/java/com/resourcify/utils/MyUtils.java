package com.resourcify.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public abstract class MyUtils {

  public static String extractMessageFromResponse(String message) {
    Pattern pattern = Pattern.compile("\"message\":\"(.*?)\"");
    Matcher matcher = pattern.matcher(message);

    if (matcher.find()) {
      return matcher.group(1);
    }
    return "Message not found";
  }
}

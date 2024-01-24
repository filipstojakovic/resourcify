package com.resourcify.model.request;

import com.resourcify.common.model.enums.StatusEnum;
import lombok.Data;

@Data
public class StatusRequest {

  private StatusEnum status;
}

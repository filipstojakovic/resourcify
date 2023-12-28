package com.resourcify;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class ResourceController {

    @GetMapping("/messages")
    public String getMessages(Principal principal) {
        return "the protected messages";
    }
}

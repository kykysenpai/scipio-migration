package be.mytcc.scipio.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StaticController {

    @RequestMapping(value = "/**/{[path:[^\\.]*}")
    public String redirect() {
        return "forward:/index.html";
    }

}

package co.com.elbaiven.api.user.inRQ;

import lombok.Data;

@Data
public class LoginRQ {
    private  String email;
    private String password;
}

package co.com.elbaiven.api.user.inrq;

import lombok.Data;

@Data
public class LoginRq {
    private  String email;
    private String password;
}

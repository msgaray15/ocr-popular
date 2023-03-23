package co.com.elbaiven.api.user.inRQ;

import lombok.Data;

@Data
public class UserRQ {
    private Long idPerson;
    private Long idRol;
    private  String email;
    private  String password;
}

package co.com.elbaiven.api.user.inRQ;

import lombok.Data;
import lombok.NonNull;
import reactor.util.annotation.Nullable;

@Data
public class UserRQ {
    private Long idPerson;
    private Long idRol;
    private  String email;
    private  String password;
}

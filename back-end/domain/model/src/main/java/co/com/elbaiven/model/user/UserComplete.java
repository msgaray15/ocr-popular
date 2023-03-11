package co.com.elbaiven.model.user;

import co.com.elbaiven.model.person.Person;
import co.com.elbaiven.model.rol.Rol;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
public class UserComplete {
    private Long id;
    private Person person;
    private Rol rol;
    private  String email;
}

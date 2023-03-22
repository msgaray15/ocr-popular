package co.com.elbaiven.model.user;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
public class User {
    private Long id;
    private Long idPerson;
    private Long idRol;
    private  String email;
    private  String password;
}

package co.com.elbaiven.model.user;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class User {
    private Long id;
    private Long idPerson;
    private Long idRol;
    private  String user;
    private  String password;
}

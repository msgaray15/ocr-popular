package co.com.elbaiven.model.rol;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
public class Rol {
    private Long id;
    private String name;
}

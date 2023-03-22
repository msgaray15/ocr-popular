package co.com.elbaiven.model.typevehicle;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
public class TypeVehicle {
    private Long id;
    private String name;
}

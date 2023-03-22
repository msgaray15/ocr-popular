package co.com.elbaiven.model.state;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
public class State {
    private Long id;
    private String name;
}

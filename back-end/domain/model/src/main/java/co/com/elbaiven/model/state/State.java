package co.com.elbaiven.model.state;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class State {
    private Long id;
    private String name;
}

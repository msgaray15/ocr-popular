package co.com.elbaiven.model.person;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
public class Person {
    private Long id;
    private Long identification;
    private String name;
    private Long phone;
    private String address;
}

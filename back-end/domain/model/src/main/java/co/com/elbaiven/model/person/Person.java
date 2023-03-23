package co.com.elbaiven.model.person;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder(toBuilder = true)
public class Person {
    private Long id;
    private Long identification;
    private String name;
    private Long phone;
    private String address;
}

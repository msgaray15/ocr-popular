package co.com.elbaiven.model.user;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
public class Login {
    private  String user;
    private String token;
}

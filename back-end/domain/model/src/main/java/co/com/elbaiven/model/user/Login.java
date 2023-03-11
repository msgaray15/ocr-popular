package co.com.elbaiven.model.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class Login {
    private  String user;
    private String token;
}

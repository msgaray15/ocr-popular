package co.com.elbaiven.util;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class Recognition {
    @Value("${recognition.client-id}")
    private String clientId;
    @Value("${recognition.client-secret}")
    private String clientSecret;
}

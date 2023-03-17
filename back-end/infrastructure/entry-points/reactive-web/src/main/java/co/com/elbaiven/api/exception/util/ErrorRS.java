package co.com.elbaiven.api.exception.util;

import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class ErrorRS {
    private Object error;
}

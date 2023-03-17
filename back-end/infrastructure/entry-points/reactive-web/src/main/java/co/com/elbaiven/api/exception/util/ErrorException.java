package co.com.elbaiven.api.exception.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class ErrorException extends RuntimeException{
    private static final long serialVersionUID = 2405172041950251807L;
    private final String code;
    private final String detail;
}

package co.com.elbaiven.api.exception;

import co.com.elbaiven.api.exception.util.ErrorException;
import co.com.elbaiven.api.exception.util.ErrorRS;
import co.com.elbaiven.api.exception.util.ErrorRSData;
import co.com.elbaiven.util.LoggerMessage;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@ControllerAdvice(annotations = RestController.class)
public class ExceptionController {
    private final LoggerMessage logger = new LoggerMessage("Error");;

    @ExceptionHandler(ErrorException.class)
    public ResponseEntity<Object> loginError(ErrorException errorException){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ErrorRS.builder().error(getErrorRSData(errorException)).build());
    }

    private ErrorRSData getErrorRSData(ErrorException errorException){
        ErrorRSData errorRSData = ErrorRSData.builder()
                .code(errorException.getCode())
                .detail(errorException.getDetail())
                .build();
        logger.loggerInfo(errorRSData.toString());
        return errorRSData;
    }


}

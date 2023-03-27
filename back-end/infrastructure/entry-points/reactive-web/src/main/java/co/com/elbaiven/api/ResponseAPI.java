package co.com.elbaiven.api;

import co.com.elbaiven.util.LoggerMessage;
import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class ResponseAPI {
    private Object data;

    private static final LoggerMessage loggerMessage = new LoggerMessage("Out");

    public static ResponseAPI getResponseAPI(Object o){
        ResponseAPI responseAPI = ResponseAPI.builder()
                .data(o)
                .build();
        loggerMessage.loggerInfo(responseAPI.toString());
        return responseAPI;
    }
}

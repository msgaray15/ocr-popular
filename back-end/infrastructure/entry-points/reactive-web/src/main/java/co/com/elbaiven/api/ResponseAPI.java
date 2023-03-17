package co.com.elbaiven.api;

import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class ResponseAPI {
    private Object data;

    public static ResponseAPI getResponseAPI(Object o){
        return ResponseAPI.builder()
                .data(o)
                .build();
    }
}

package co.com.elbaiven.model.control;

import lombok.Builder;
import lombok.Data;
@Data
@Builder(toBuilder = true)
public class ControlVigilante {
    public static final String DANGER = "danger";
    public static final String WARNING = "warning";
    public static final String SUCCESS = "success";
    private String key;
    private String placa;
    private String state;
    private String date;

}

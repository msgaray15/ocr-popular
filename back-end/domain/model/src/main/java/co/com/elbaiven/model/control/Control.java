package co.com.elbaiven.model.control;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
public class Control {
    private Long id;
    private String date;
    private Long idState; // input; out
    private Long idVehicle;
}

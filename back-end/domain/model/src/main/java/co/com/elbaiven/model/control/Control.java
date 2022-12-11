package co.com.elbaiven.model.control;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class Control {
    private Long id;
    private LocalDateTime date;
    private Long idState;
    private Long idVehicle;
}

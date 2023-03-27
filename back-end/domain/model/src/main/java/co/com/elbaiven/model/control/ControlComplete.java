package co.com.elbaiven.model.control;

import co.com.elbaiven.model.state.State;
import co.com.elbaiven.model.vehicle.VehicleComplete;
import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class ControlComplete {
    private Long id;
    private String date;
    private State state;
    private VehicleComplete vehicle;
}

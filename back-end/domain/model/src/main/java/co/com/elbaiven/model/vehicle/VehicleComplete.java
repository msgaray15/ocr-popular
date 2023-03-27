package co.com.elbaiven.model.vehicle;

import co.com.elbaiven.model.typevehicle.TypeVehicle;
import co.com.elbaiven.model.user.UserComplete;
import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class VehicleComplete {
    private Long id;
    private String serial;
    private TypeVehicle typeVehicle;
    private String licensePlate;
    private UserComplete user;
}

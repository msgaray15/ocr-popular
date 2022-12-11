package co.com.elbaiven.model.vehicle;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class Vehicle {
    private Long id;
    private String serial;
    private Long idTypeVehicle;
    private String licensePlate;
    private Long idUser;
}

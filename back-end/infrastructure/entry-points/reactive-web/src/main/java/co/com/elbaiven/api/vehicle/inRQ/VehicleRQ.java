package co.com.elbaiven.api.vehicle.inRQ;

import lombok.Data;

@Data
public class VehicleRQ {
    private String serial;
    private Long idTypeVehicle;
    private String licensePlate;
    private Long idUser;
}

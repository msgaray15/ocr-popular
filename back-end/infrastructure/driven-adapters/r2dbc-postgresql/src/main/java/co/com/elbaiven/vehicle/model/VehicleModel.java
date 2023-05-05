package co.com.elbaiven.vehicle.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Builder(toBuilder = true)
@Table("vehicles")
public class VehicleModel {
    @Id
    @Column("id")
    private Long id;
    @Column("serial")
    private String serial;
    @Column("id_tipo_vehicle")
    private Long idTypeVehicle;
    @Column("license_plate")
    private String licensePlate;
    @Column("id_user")
    private Long idUser;
}

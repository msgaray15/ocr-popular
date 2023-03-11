package co.com.elbaiven.vehicle.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("vehicles")
public class VehicleModel {
    @Id
    @Column("id")
    private Long id;
    @Column("serial")
    private String serial;
    @Column("idTipoVehicle")
    private Long idTypeVehicle;
    @Column("licensePlate")
    private String licensePlate;
    @Column("idUser")
    private Long idUser;
}

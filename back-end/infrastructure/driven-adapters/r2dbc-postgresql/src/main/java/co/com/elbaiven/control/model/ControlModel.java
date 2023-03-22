package co.com.elbaiven.control.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
@Table("controls")
public class ControlModel {
    @Id
    @Column("id")
    private Long id;
    @Column("date")
    private String date;
    @Column("id_state")
    private Long idState;
    @Column("id_vehicle")
    private Long idVehicle;
}

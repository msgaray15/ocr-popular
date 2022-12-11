package co.com.elbaiven.control.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("controls")
public class ControlModel {
    @Id
    @Column("id")
    private Long id;
    @Column("date")
    private LocalDateTime date;
    @Column("idState")
    private Long idState;
    @Column("idVehicle")
    private Long idVehicle;
}

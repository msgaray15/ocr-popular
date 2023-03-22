package co.com.elbaiven.typeVehicle.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Builder(toBuilder = true)
@Table("type_vehicle")
public class TypeVehicleModel {
    @Id
    @Column("id")
    private Long id;
    @Column("name")
    private String name;
}

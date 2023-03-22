package co.com.elbaiven.rol.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Builder(toBuilder = true)
@Table("roles")
public class RolModel {
    @Id
    @Column("id")
    private Long id;
    @Column("name")
    private String name;
}

package co.com.elbaiven.state.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("state")
public class StateModel {
    @Id
    @Column("id")
    private Long id;
    @Column("name")
    private String name;
}

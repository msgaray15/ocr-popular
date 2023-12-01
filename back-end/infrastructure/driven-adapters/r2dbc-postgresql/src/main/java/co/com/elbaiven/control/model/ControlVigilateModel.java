package co.com.elbaiven.control.model;


import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Builder(toBuilder = true)
@Table("control_vigilante")
public class ControlVigilateModel {
    @Id
    @Column("id")
    private Integer id;
    @Column("key")
    private String key;
    @Column("placa")
    private String placa;
    @Column("state")
    private String state;
    @Column("date")
    private String date;
}

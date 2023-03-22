package co.com.elbaiven.person.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
@Table("people")
public class PersonModel {
    @Id
    @Column("id")
    private Long id;
    @Column("identification")
    private Long identification;
    @Column("name")
    private String name;
    @Column("phone")
    private Long phone;
    @Column("address")
    private String address;
}

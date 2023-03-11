package co.com.elbaiven.user.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("users")
public class UserModel {
    @Id
    @Column("id")
    private Long id;
    @Column("id_person")
    private Long idPerson;
    @Column("id_rol")
    private Long idRol;
    @Column("email")
    private  String email;
    @Column("password")
    private  String password;
}

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
    @Column("idPerson")
    private Long idPerson;
    @Column("idRol")
    private Long idRol;
    @Column("user")
    private  String user;
    @Column("password")
    private  String password;
}

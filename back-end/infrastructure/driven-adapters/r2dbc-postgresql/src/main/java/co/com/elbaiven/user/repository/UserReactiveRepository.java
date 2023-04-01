package co.com.elbaiven.user.repository;

import co.com.elbaiven.user.model.UserModel;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

// TODO: This file is just an example, you should delete or modify it
public interface UserReactiveRepository extends ReactiveCrudRepository<UserModel, Long> {
    Mono<UserModel> findByEmailAndPassword(String user, String password);
    @Query(value="SELECT * FROM users u WHERE u.email LIKE :user")
    Mono<UserModel> findByEmail(String user);
    @Query(value="SELECT * FROM users u WHERE u.email LIKE :user LIMIT :pageSize OFFSET :page")
    Flux<UserModel> findByEmail(String user, Integer pageSize,Integer page);
    @Query(value="SELECT COUNT(*) FROM users u WHERE u.email LIKE :user")
    Mono<Long> countFindByEmail(String user);
    @Query(value="SELECT * FROM users u WHERE u.id_rol = :idRol LIMIT :pageSize OFFSET :page")
    Flux<UserModel> findByIdRol(Long idRol, Integer pageSize,Integer page);
    @Query(value="SELECT COUNT(*) FROM users u WHERE u.id_rol = :idRol")
    Mono<Long> countFindByIdRol(Long idRol);
    @Query(value="SELECT * FROM users LIMIT :pageSize OFFSET :page")
    Flux<UserModel> findAll(Integer pageSize, Integer page);
}

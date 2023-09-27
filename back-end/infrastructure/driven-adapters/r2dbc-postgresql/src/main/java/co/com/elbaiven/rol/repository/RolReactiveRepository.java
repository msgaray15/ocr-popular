package co.com.elbaiven.rol.repository;

import co.com.elbaiven.rol.model.RolModel;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

// TODO: This file is just an example, you should delete or modify it
public interface RolReactiveRepository extends ReactiveCrudRepository<RolModel, Long> {
    @Query(value = "SELECT * FROM roles r WHERE r.name LIKE :name")
    Mono<RolModel> findByName(String name);
}

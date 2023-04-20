package co.com.elbaiven.person.repository;

import co.com.elbaiven.person.model.PersonModel;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

// TODO: This file is just an example, you should delete or modify it
public interface PersonReactiveRepository extends ReactiveCrudRepository<PersonModel, Long> {
    @Query(value="SELECT * FROM people p WHERE p.identification LIKE :identification")
    Mono<PersonModel> findByIdentification(String identification);
    @Query(value="SELECT * FROM people p WHERE p.identification LIKE :identification LIMIT :pageSize OFFSET :page")
    Flux<PersonModel> findByIdentification(String identification, Integer pageSize, Integer page);
    @Query(value="SELECT COUNT(*) FROM people p WHERE p.identification LIKE :identification")
    Mono<Long> countFindByIdentification(String identification);
    @Query(value="SELECT * FROM people p WHERE p.name LIKE :name LIMIT :pageSize OFFSET :page")
    Flux<PersonModel> findByName(String name, Integer pageSize, Integer page);
    @Query(value="SELECT COUNT(*) FROM people p WHERE p.name LIKE :name")
    Mono<Long> countFindByName(String name);
    @Query(value="SELECT * FROM people p WHERE p.phone LIKE :phone LIMIT :pageSize OFFSET :page")
    Flux<PersonModel> findByPhone(String phone, Integer pageSize, Integer page);
    @Query(value="SELECT COUNT(*) FROM people p WHERE p.phone LIKE :phone")
    Mono<Long> countFindByPhone(String phone);
    @Query(value="SELECT * FROM people LIMIT :pageSize OFFSET :page")
    Flux<PersonModel> findAll(Integer pageSize, Integer page);
}

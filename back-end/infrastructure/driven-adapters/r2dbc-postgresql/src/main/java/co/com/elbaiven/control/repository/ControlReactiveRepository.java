package co.com.elbaiven.control.repository;

import co.com.elbaiven.control.model.ControlModel;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

// TODO: This file is just an example, you should delete or modify it
public interface ControlReactiveRepository extends ReactiveCrudRepository<ControlModel, Long> {

    @Query(value = "SELECT * FROM controls c  WHERE c.date BETWEEN :dateStart AND :dateEnd LIMIT :pageSize OFFSET :page")
    Flux<ControlModel> findByDate(String dateStart, String dateEnd, Integer pageSize, Integer page);

    @Query(value = "SELECT COUNT(*) FROM controls c  WHERE c.date LIKE :date")
    Mono<Long> countFindByDate(String date);

    @Query(value = "SELECT * FROM controls LIMIT :pageSize OFFSET :page")
    Flux<ControlModel> findAll(Integer pageSize, Integer page);

    @Query(value = "SELECT * FROM controls c  WHERE c.id_state = :idState LIMIT :pageSize OFFSET :page")
    Flux<ControlModel> findByIdState(Long idState, Integer pageSize, Integer page);

    @Query(value = "SELECT COUNT(*) FROM controls c  WHERE c.id_state = :idState")
    Mono<Long> countFindByIdState(Long idState);

    @Query(value = "SELECT * FROM controls c  WHERE c.id_vehicle = :idVehicle LIMIT :pageSize OFFSET :page")
    Flux<ControlModel> findByIdVehicle(Long idVehicle, Integer pageSize, Integer page);

    @Query(value = "SELECT COUNT(*) FROM controls c  WHERE c.id_vehicle = :idVehicle")
    Mono<Long> countFindByIdVehicle(Long idVehicle);
}

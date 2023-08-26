package co.com.elbaiven.vehicle.repository;

import co.com.elbaiven.vehicle.model.VehicleModel;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface VehicleReactiveRepository extends ReactiveCrudRepository<VehicleModel, Long> {
    Mono<VehicleModel> findByLicensePlate(String licensePlate);
    @Query(value="SELECT * FROM vehicles LIMIT :pageSize OFFSET :page")
    Flux<VehicleModel> findAll(Integer pageSize,Integer page);
    @Query(value="SELECT * FROM vehicles v WHERE v.serial LIKE :search LIMIT :pageSize OFFSET :page")
    Flux<VehicleModel> findBySerial(String search, Integer pageSize,Integer page);
    @Query(value="SELECT * FROM vehicles v WHERE v.serial LIKE :search")
    Mono<Long> countFindBySerial(String search);
    @Query(value="SELECT * FROM vehicles v WHERE v.license_plate LIKE :search LIMIT :pageSize OFFSET :page")
    Flux<VehicleModel> findByLicensePlate(String search, Integer pageSize,Integer page);
    @Query(value="SELECT * FROM vehicles v WHERE v.license_plate LIKE :search")
    Mono<Long> countFindByLicensePlate(String search);

}

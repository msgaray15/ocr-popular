package co.com.elbaiven.vehicle.repository;

import co.com.elbaiven.vehicle.model.VehicleModel;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

// TODO: This file is just an example, you should delete or modify it
public interface VehicleReactiveRepository extends ReactiveCrudRepository<VehicleModel, Long> {
    Mono<VehicleModel> findByLicensePlate(String licensePlate);
}

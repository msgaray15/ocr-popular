package co.com.elbaiven.model.vehicle.gateways;

import co.com.elbaiven.model.vehicle.Vehicle;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface VehicleRepository {
    Mono<Vehicle> create(Vehicle vehicle);
    Mono<Vehicle> read(Long id);
    Mono<Vehicle> getLicensePlate(String licensePlate);
    Mono<Vehicle> update(Long id,Vehicle vehicle);
    Mono<Void> delete(Long id);
    Flux<Vehicle> getAll();
}

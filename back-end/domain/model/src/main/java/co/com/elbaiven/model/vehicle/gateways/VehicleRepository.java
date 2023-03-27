package co.com.elbaiven.model.vehicle.gateways;

import co.com.elbaiven.model.vehicle.Vehicle;
import co.com.elbaiven.model.vehicle.VehicleComplete;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface VehicleRepository {
    Mono<Vehicle> create(Vehicle vehicle);
    Mono<VehicleComplete> read(Long id);
    Mono<Vehicle> getLicensePlate(String licensePlate);
    Mono<Vehicle> update(Long id,Vehicle vehicle);
    Mono<Void> delete(Long id);
    Flux<VehicleComplete> getAll(Integer page, Integer pageSize, String typeSearch, String search);
    Mono<Long> count();
    Mono<Long> countFindBySerial(String search);
    Mono<Long> countFindByLicensePlate(String search);
}

package co.com.elbaiven.usecase.vehicle;

import co.com.elbaiven.model.user.User;
import co.com.elbaiven.model.user.gateways.UserRepository;
import co.com.elbaiven.model.vehicle.Vehicle;
import co.com.elbaiven.model.vehicle.gateways.VehicleRepository;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
public class VehicleUseCase {
    private final VehicleRepository vehicleRepository;

    public Mono<Vehicle> create(Vehicle vehicle){
        return vehicleRepository.create(vehicle);
    }

    public Mono<Vehicle> read(Long id){
        return vehicleRepository.read(id);
    }

    public Mono<Vehicle> update(Long id, Vehicle vehicle){
        return vehicleRepository.update(id,vehicle);
    }

    public Mono<Void> delete(Long id){
        return vehicleRepository.delete(id);
    }

    public Flux<Vehicle> getAll(){
        return vehicleRepository.getAll();
    }
}

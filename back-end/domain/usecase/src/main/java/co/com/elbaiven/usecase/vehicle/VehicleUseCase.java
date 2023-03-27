package co.com.elbaiven.usecase.vehicle;

import co.com.elbaiven.model.user.User;
import co.com.elbaiven.model.user.gateways.UserRepository;
import co.com.elbaiven.model.utils.ModelListCompleteWithPages;
import co.com.elbaiven.model.vehicle.Vehicle;
import co.com.elbaiven.model.vehicle.VehicleComplete;
import co.com.elbaiven.model.vehicle.gateways.VehicleRepository;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Arrays;

@RequiredArgsConstructor
public class VehicleUseCase {
    private final VehicleRepository vehicleRepository;

    public Mono<Vehicle> create(Vehicle vehicle){
        return vehicleRepository.create(vehicle);
    }

    public Mono<VehicleComplete> read(Long id){
        return vehicleRepository.read(id);
    }

    public Mono<Vehicle> update(Long id, Vehicle vehicle){
        return vehicleRepository.update(id,vehicle);
    }

    public Mono<Void> delete(Long id){
        return vehicleRepository.delete(id);
    }

    public Mono<ModelListCompleteWithPages> getAll(Integer page, Integer pageSize, String typeSearch, String search){
        return vehicleRepository.getAll(page, pageSize, typeSearch, search)
                .collectList()
                .flatMap(e->getCount(typeSearch, search)
                                .map(count->ModelListCompleteWithPages.
                                        getModelListCompleteWithPages(Arrays.asList(e.toArray()),count, page +1, pageSize)
                                )
                );
    }

    private Mono<Long> getCount(String typeSearch, String search){
        switch (typeSearch) {
            case "serial":
                return vehicleRepository.countFindBySerial(search +'%');
            case "licensePlate":
                return vehicleRepository.countFindByLicensePlate(search +'%');
            default:
                return vehicleRepository.count();
        }
    }

}

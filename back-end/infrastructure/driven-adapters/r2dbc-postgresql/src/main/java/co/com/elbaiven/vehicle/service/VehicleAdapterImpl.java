package co.com.elbaiven.vehicle.service;

import co.com.elbaiven.model.vehicle.Vehicle;
import co.com.elbaiven.model.vehicle.gateways.VehicleRepository;
import co.com.elbaiven.vehicle.model.VehicleModel;
import co.com.elbaiven.vehicle.repository.VehicleReactiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class VehicleAdapterImpl implements VehicleRepository {
    private final VehicleReactiveRepository vehicleReactiveRepository;

    public Mono<Vehicle> create(Vehicle  vehicle) {
        return !notNullFields(vehicle) ?
                Mono.error(new Exception("Los campos no comple con los valores aceptados")):
                vehicleReactiveRepository.save(toVehicleModel(vehicle))
                .map((e) -> toVehicle(e));
    }

    public Mono<Vehicle> read(Long id) {
        return vehicleReactiveRepository.findById(id)
                .map((e) ->toVehicle(e));
    }

    public Mono<Vehicle> update(Long id, Vehicle vehicle) {
        vehicle.setId(id);
        return (id > 0 && !notNullFields(vehicle)) ?
                Mono.error(new Exception("Los campos no comple con los valores aceptados")):
                vehicleReactiveRepository.save(toVehicleModel(vehicle))
                        .map((e) ->toVehicle(e));
    }

    public Mono<Void> delete(Long id) {
        return id < 0 ? Mono.error(new Exception("El campo Id no comple con los valores aceptados")) :
                vehicleReactiveRepository.deleteById(id);
    }

    public Flux<Vehicle> getAll() {
        return vehicleReactiveRepository.findAll()
                .map((e) ->toVehicle(e));
    }

    public static VehicleModel toVehicleModel(Vehicle vehicle) {
        return new VehicleModel(
                vehicle.getId(),
                vehicle.getSerial(),
                vehicle.getIdTypeVehicle(),
                vehicle.getLicensePlate(),
                vehicle.getIdUser()
        );
    }

    public static Vehicle toVehicle(VehicleModel vehicleModel) {
        return new Vehicle(
                vehicleModel.getId(),
                vehicleModel.getSerial(),
                vehicleModel.getIdTypeVehicle(),
                vehicleModel.getLicensePlate(),
                vehicleModel.getIdUser()
        );
    }

    public static boolean notNullFields(Vehicle vehicle) {
        return (vehicle.getSerial().length() > 0 && vehicle.getIdTypeVehicle() > 0 && vehicle.getLicensePlate().length() > 0 && vehicle.getIdUser() > 0);
    }
}

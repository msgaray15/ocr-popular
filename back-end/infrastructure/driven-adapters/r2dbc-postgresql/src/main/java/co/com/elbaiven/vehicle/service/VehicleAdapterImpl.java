package co.com.elbaiven.vehicle.service;

import co.com.elbaiven.api.exception.util.ErrorException;
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

    public Mono<Vehicle> create(Vehicle vehicle) {
        return vehicleReactiveRepository.save(toVehicleModel(vehicle))
                .map((e) -> toVehicle(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Vehicle> read(Long id) {
        return vehicleReactiveRepository.findById(id)
                .map((e) -> toVehicle(e))
                .switchIfEmpty(Mono.defer(() -> {
                    throw new ErrorException("404", "No se encontraron Vehicles");
                }));
    }

    public Mono<Vehicle> getLicensePlate(String licensePlate) {
        return vehicleReactiveRepository.findByLicensePlate(licensePlate)
                .map((e) -> toVehicle(e))
                .switchIfEmpty(Mono.defer(() -> {
                    throw new ErrorException("404", "No se encontraron Vehicles");
                }));
    }

    public Mono<Vehicle> update(Long id, Vehicle vehicle) {
        vehicle.setId(id);
        return vehicleReactiveRepository.save(toVehicleModel(vehicle))
                .map((e) -> toVehicle(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Void> delete(Long id) {
        return vehicleReactiveRepository.deleteById(id)
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Flux<Vehicle> getAll() {
        return vehicleReactiveRepository.findAll()
                .map((e) -> toVehicle(e));
    }

    private static VehicleModel toVehicleModel(Vehicle vehicle) {
        return VehicleModel.builder()
                .id(vehicle.getId())
                .serial(vehicle.getSerial())
                .idTypeVehicle(vehicle.getIdTypeVehicle())
                .idUser(vehicle.getIdUser())
                .licensePlate(vehicle.getLicensePlate())
                .build();
    }

    private static Vehicle toVehicle(VehicleModel vehicleModel) {
        return Vehicle.builder()
                .id(vehicleModel.getId())
                .serial(vehicleModel.getSerial())
                .idTypeVehicle(vehicleModel.getIdTypeVehicle())
                .idUser(vehicleModel.getIdUser())
                .licensePlate(vehicleModel.getLicensePlate())
                .build();
    }

}

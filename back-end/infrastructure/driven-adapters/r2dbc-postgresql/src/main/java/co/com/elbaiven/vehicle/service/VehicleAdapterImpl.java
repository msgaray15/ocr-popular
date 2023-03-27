package co.com.elbaiven.vehicle.service;

import co.com.elbaiven.api.exception.util.ErrorException;
import co.com.elbaiven.model.person.Person;
import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.model.typevehicle.TypeVehicle;
import co.com.elbaiven.model.user.UserComplete;
import co.com.elbaiven.model.vehicle.Vehicle;
import co.com.elbaiven.model.vehicle.VehicleComplete;
import co.com.elbaiven.model.vehicle.gateways.VehicleRepository;
import co.com.elbaiven.typeVehicle.service.TypeVehicleAdapterImpl;
import co.com.elbaiven.user.service.UserAdapterImpl;
import co.com.elbaiven.util.LoggerMessage;
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
    private final TypeVehicleAdapterImpl typeVehicleAdapter;
    private final UserAdapterImpl userAdapter;

    public Mono<Vehicle> create(Vehicle vehicle) {
        return vehicleReactiveRepository.save(toVehicleModel(vehicle))
                .map((e) -> toVehicle(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<VehicleComplete> read(Long id) {
        return vehicleReactiveRepository.findById(id)
                .flatMap((e) -> {
                    Mono<TypeVehicle> typeVehicle = typeVehicleAdapter.read(e.getIdTypeVehicle());
                    Mono<UserComplete> userComplete = userAdapter.read(e.getIdUser());
                    return Mono.zip(typeVehicle, userComplete)
                            .map(tuple -> getVehicleComplete(e, tuple.getT1(), tuple.getT2()));
                })
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                })
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

    public Mono<Long> count() {
        return vehicleReactiveRepository.count();
    }

    public Mono<Long> countFindBySerial(String search) {
        return vehicleReactiveRepository.countFindBySerial(search);
    }

    public Mono<Long> countFindByLicensePlate(String search) {
        return vehicleReactiveRepository.countFindByLicensePlate(search);
    }

    public Flux<VehicleComplete> getAll(Integer page, Integer pageSize, String typeSearch, String search) {
        return getListVehicleByTypeSearch(page, pageSize, typeSearch, search)
                .flatMap((e) -> {
                    Mono<TypeVehicle> typeVehicle = typeVehicleAdapter.read(e.getIdTypeVehicle());
                    Mono<UserComplete> userComplete = userAdapter.read(e.getIdUser());
                    return Mono.zip(typeVehicle, userComplete)
                            .map(tuple -> getVehicleComplete(e, tuple.getT1(), tuple.getT2()));
                })
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    private Flux<VehicleModel> getListVehicleByTypeSearch(Integer page, Integer pageSize, String typeSearch, String search) {
        switch (typeSearch) {
            case "serial":
                return vehicleReactiveRepository.findBySerial(search +'%', pageSize, page);
            case "licensePlate":
                return vehicleReactiveRepository.findByLicensePlate(search +'%', pageSize, page);
            default:
                return vehicleReactiveRepository.findAll(pageSize, page);
        }
    }

    private static VehicleComplete getVehicleComplete(VehicleModel vehicleModel, TypeVehicle typeVehicle, UserComplete userComplete) {
        return VehicleComplete.builder()
                .id(vehicleModel.getId())
                .serial(vehicleModel.getSerial())
                .typeVehicle(typeVehicle)
                .licensePlate(vehicleModel.getLicensePlate())
                .user(userComplete)
                .build();

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

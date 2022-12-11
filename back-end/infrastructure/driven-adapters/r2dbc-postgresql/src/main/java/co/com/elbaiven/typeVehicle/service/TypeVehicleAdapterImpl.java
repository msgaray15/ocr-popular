package co.com.elbaiven.typeVehicle.service;

import co.com.elbaiven.model.state.State;
import co.com.elbaiven.model.state.gateways.StateRepository;
import co.com.elbaiven.model.typevehicle.TypeVehicle;
import co.com.elbaiven.model.typevehicle.gateways.TypeVehicleRepository;
import co.com.elbaiven.typeVehicle.model.TypeVehicleModel;
import co.com.elbaiven.typeVehicle.repository.TypeVehicleReactiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class TypeVehicleAdapterImpl implements TypeVehicleRepository {
    private final TypeVehicleReactiveRepository typeVehicleReactiveRepository;

    public Mono<TypeVehicle> create(TypeVehicle typeVehicle) {
        return !notNullFields(typeVehicle) ?
                Mono.error(new Exception("Los campos no comple con los valores aceptados")):
                typeVehicleReactiveRepository.save(toTypeVehicleModel(typeVehicle))
                .map((e) -> toTypeVehicle(e));
    }

    public Mono<TypeVehicle> read(Long id) {
        return typeVehicleReactiveRepository.findById(id)
                .map((e) ->toTypeVehicle(e));
    }

    public Mono<TypeVehicle> update(Long id, TypeVehicle typeVehicle) {
        typeVehicle.setId(id);
        return (id > 0 && !notNullFields(typeVehicle)) ?
                Mono.error(new Exception("Los campos no comple con los valores aceptados")):
                typeVehicleReactiveRepository.save(toTypeVehicleModel(typeVehicle))
                        .map((e) ->toTypeVehicle(e));
    }

    public Mono<Void> delete(Long id) {
        return id < 0 ? Mono.error(new Exception("El campo Id no comple con los valores aceptados")) :
                typeVehicleReactiveRepository.deleteById(id);
    }

    public Flux<TypeVehicle> getAll() {
        return typeVehicleReactiveRepository.findAll()
                .map((e) ->toTypeVehicle(e));
    }

    public static TypeVehicleModel toTypeVehicleModel(TypeVehicle typeVehicle) {
        return new TypeVehicleModel(
                typeVehicle.getId(),
                typeVehicle.getName()
        );
    }

    public static TypeVehicle toTypeVehicle(TypeVehicleModel typeVehicleModel) {
        return new TypeVehicle(
                typeVehicleModel.getId(),
                typeVehicleModel.getName()
        );
    }

    public static boolean notNullFields(TypeVehicle typeVehicle) {
        return (typeVehicle.getName().length() > 0 );
    }
}

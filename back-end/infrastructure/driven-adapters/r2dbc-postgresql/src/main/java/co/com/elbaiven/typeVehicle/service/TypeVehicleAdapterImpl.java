package co.com.elbaiven.typeVehicle.service;

import co.com.elbaiven.api.exception.util.ErrorException;
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
        return typeVehicleReactiveRepository.save(toTypeVehicleModel(typeVehicle))
                .map((e) -> toTypeVehicle(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<TypeVehicle> read(Long id) {
        return typeVehicleReactiveRepository.findById(id)
                .map((e) ->toTypeVehicle(e))
                .switchIfEmpty(Mono.defer(() -> {
                                    throw new ErrorException("404", "TypeVehicle no encontrado");
                                }
                        )
                );
    }

    public Mono<TypeVehicle> update(Long id, TypeVehicle typeVehicle) {
        typeVehicle.setId(id);
        return typeVehicleReactiveRepository.save(toTypeVehicleModel(typeVehicle))
                .map((e) ->toTypeVehicle(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Void> delete(Long id) {
        return typeVehicleReactiveRepository.deleteById(id)
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Flux<TypeVehicle> getAll() {
        return typeVehicleReactiveRepository.findAll()
                .map((e) ->toTypeVehicle(e));
    }

    public static TypeVehicleModel toTypeVehicleModel(TypeVehicle typeVehicle) {
        return  TypeVehicleModel.builder()
                .id(typeVehicle.getId())
                .name(typeVehicle.getName())
                .build();
    }

    public static TypeVehicle toTypeVehicle(TypeVehicleModel typeVehicleModel) {
        return  TypeVehicle.builder()
                .id(typeVehicleModel.getId())
                .name(typeVehicleModel.getName())
                .build();
    }
}

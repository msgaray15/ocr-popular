package co.com.elbaiven.rol.service;

import co.com.elbaiven.api.exception.util.ErrorException;
import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.model.rol.gateways.RolRepository;
import co.com.elbaiven.rol.model.RolModel;
import co.com.elbaiven.rol.repository.RolReactiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class RolAdapterImpl implements RolRepository {
    private final RolReactiveRepository rolReactiveRepository;

    public Mono<Rol> create(Rol rol) {
        return rolReactiveRepository.save(toRolModel(rol))
                .map((e) -> toRol(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Rol> read(Long id) {
        return rolReactiveRepository.findById(id)
                .map((e) ->toRol(e))
                .switchIfEmpty(Mono.defer(() -> {
                                    throw new ErrorException("404", "Rol no encontrado");
                                }
                        )
                );
    }

    public Mono<Rol> update(Long id, Rol rol) {
        rol.setId(id);
        return rolReactiveRepository.save(toRolModel(rol))
                .map((e) ->toRol(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Void> delete(Long id) {
        return rolReactiveRepository.deleteById(id)
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Flux<Rol> getAll() {
        return rolReactiveRepository.findAll()
                .map((e) ->toRol(e));
    }

    public static RolModel toRolModel(Rol rol) {
        return RolModel.builder()
                .id(rol.getId())
                .name(rol.getName())
                .build();
    }

    public static Rol toRol(RolModel rolModel) {
        return  Rol.builder()
                .id(rolModel.getId())
                .name(rolModel.getName())
                .build();
    }

}

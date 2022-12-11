package co.com.elbaiven.model.rol.gateways;

import co.com.elbaiven.model.rol.Rol;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface RolRepository {
    Mono<Rol> create(Rol rol);
    Mono<Rol> read(Long id);
    Mono<Rol> update(Long id,Rol rol);
    Mono<Void> delete(Long id);
    Flux<Rol> getAll();
}

package co.com.elbaiven.usecase.rol;

import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.model.rol.gateways.RolRepository;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
public class RolUseCase {
    private final RolRepository rolRepository;

    public Mono<Rol> create(Rol rol){
        return rolRepository.create(rol);
    }

    public Mono<Rol> read(Long id){
        return rolRepository.read(id);
    }

    public Mono<Rol> update(Long id,Rol rol){
        return rolRepository.update(id,rol);
    }

    public Mono<Void> delete(Long id){
        return rolRepository.delete(id);
    }

    public Flux<Rol> getAll(){
        return rolRepository.getAll();
    }
}

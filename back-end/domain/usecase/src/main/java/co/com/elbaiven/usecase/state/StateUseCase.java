package co.com.elbaiven.usecase.state;

import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.model.rol.gateways.RolRepository;
import co.com.elbaiven.model.state.State;
import co.com.elbaiven.model.state.gateways.StateRepository;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RequiredArgsConstructor
public class StateUseCase {
    private final StateRepository  stateRepository;

    public Mono<State> create(State state){
        return stateRepository.create(state);
    }

    public Mono<State> read(Long id){
        return stateRepository.read(id);
    }

    public Mono<State> update(Long id,State state){
        return stateRepository.update(id,state);
    }

    public Mono<Void> delete(Long id){
        return stateRepository.delete(id);
    }

    public Mono<List<State>> getAll(){
        return stateRepository.getAll()
                .collectList();
    }
}

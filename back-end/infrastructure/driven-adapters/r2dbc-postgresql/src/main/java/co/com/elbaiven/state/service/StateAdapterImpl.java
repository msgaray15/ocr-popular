package co.com.elbaiven.state.service;

import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.model.state.State;
import co.com.elbaiven.model.state.gateways.StateRepository;
import co.com.elbaiven.state.model.StateModel;
import co.com.elbaiven.state.repository.StateReactiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class StateAdapterImpl implements StateRepository {
    private final StateReactiveRepository stateReactiveRepository;

    public Mono<State> create(State state) {
        return !notNullFields(state) ?
                Mono.error(new Exception("Los campos no comple con los valores aceptados")):
                stateReactiveRepository.save(toStateModel(state))
                .map((e) -> toState(e));
    }

    public Mono<State> read(Long id) {
        return stateReactiveRepository.findById(id)
                .map((e) ->toState(e));
    }

    public Mono<State> update(Long id, State state) {
        state.setId(id);
        return (id > 0 && !notNullFields(state)) ?
                Mono.error(new Exception("Los campos no comple con los valores aceptados")):
                stateReactiveRepository.save(toStateModel(state))
                        .map((e) ->toState(e));
    }

    public Mono<Void> delete(Long id) {
        return id < 0 ? Mono.error(new Exception("El campo Id no comple con los valores aceptados")) :
                stateReactiveRepository.deleteById(id);
    }

    public Flux<State> getAll() {
        return stateReactiveRepository.findAll()
                .map((e) ->toState(e));
    }

    public static StateModel toStateModel(State state) {
        return new StateModel(
                state.getId(),
                state.getName()
        );
    }

    public static State toState(StateModel stateModel) {
        return new State(
                stateModel.getId(),
                stateModel.getName()
        );
    }

    public static boolean notNullFields(State state) {
        return (state.getName().length() > 0 );
    }
}

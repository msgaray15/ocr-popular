package co.com.elbaiven.state.service;

import co.com.elbaiven.api.exception.util.ErrorException;
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
        return stateReactiveRepository.save(toStateModel(state))
                .map((e) -> toState(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<State> read(Long id) {
        return stateReactiveRepository.findById(id)
                .map((e) -> toState(e))
                .switchIfEmpty(Mono.defer(() -> {
                                    throw new ErrorException("404", "State no encontrado");
                                }
                        )
                );
    }

    public Mono<State> getName(String name) {
        return stateReactiveRepository.findByName(name)
                .map((e) -> toState(e))
                .switchIfEmpty(Mono.defer(() -> {
                                    throw new ErrorException("404", "State no encontrado");
                                }
                        )
                );
    }

    public Mono<State> update(Long id, State state) {
        state.setId(id);
        return stateReactiveRepository.save(toStateModel(state))
                .map((e) -> toState(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Void> delete(Long id) {
        return stateReactiveRepository.deleteById(id)
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });

    }

    public Flux<State> getAll() {
        return stateReactiveRepository.findAll()
                .map((e) -> toState(e));
    }

    public static StateModel toStateModel(State state) {
        return StateModel.builder()
                .id(state.getId())
                .name(state.getName())
                .build();
    }

    public static State toState(StateModel stateModel) {
        return State.builder()
                .id(stateModel.getId())
                .name(stateModel.getName())
                .build();
    }

}

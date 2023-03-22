package co.com.elbaiven.model.state.gateways;

import co.com.elbaiven.model.state.State;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface StateRepository {
    Mono<State> create(State state);
    Mono<State> read(Long id);
    Mono<State> getName(String name);
    Mono<State> update(Long id,State state);
    Mono<Void> delete(Long id);
    Flux<State> getAll();
}

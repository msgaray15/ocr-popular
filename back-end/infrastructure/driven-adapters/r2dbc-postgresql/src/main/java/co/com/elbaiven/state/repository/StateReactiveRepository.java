package co.com.elbaiven.state.repository;

import co.com.elbaiven.state.model.StateModel;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

// TODO: This file is just an example, you should delete or modify it
public interface StateReactiveRepository extends ReactiveCrudRepository<StateModel, Long> {
    Mono<StateModel> findByName(String name);
}

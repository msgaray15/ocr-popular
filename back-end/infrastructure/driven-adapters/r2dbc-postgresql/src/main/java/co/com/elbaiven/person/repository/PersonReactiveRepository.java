package co.com.elbaiven.person.repository;

import co.com.elbaiven.person.model.PersonModel;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

// TODO: This file is just an example, you should delete or modify it
public interface PersonReactiveRepository extends ReactiveCrudRepository<PersonModel, Long> {
    Mono<PersonModel> findByIdentification(Long identification);

}

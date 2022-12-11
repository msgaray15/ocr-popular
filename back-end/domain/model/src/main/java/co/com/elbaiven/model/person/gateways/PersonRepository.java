package co.com.elbaiven.model.person.gateways;

import co.com.elbaiven.model.person.Person;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface PersonRepository {
    Mono<Person> create(Person person);
    Mono<Person> read(Long id);
    Mono<Person> update(Long id,Person person);
    Mono<Void> delete(Long id);
    Flux<Person> getAll();
}

package co.com.elbaiven.usecase.person;

import co.com.elbaiven.model.person.Person;
import co.com.elbaiven.model.person.gateways.PersonRepository;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
public class PersonUseCase {
    private final PersonRepository personRepository;

    public Mono<Person> create(Person person){
        return personRepository.create(person);
    }

    public Mono<Person> read(Long id){
        return personRepository.read(id);
    }

    public Mono<Person> update(Long id,Person person){
        return personRepository.update(id,person);
    }

    public Mono<Void> delete(Long id){
        return personRepository.delete(id);
    }

    public Flux<Person> getAll(){
        return personRepository.getAll();
    }
}

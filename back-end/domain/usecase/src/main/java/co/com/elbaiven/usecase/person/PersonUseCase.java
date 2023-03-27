package co.com.elbaiven.usecase.person;

import co.com.elbaiven.model.person.Person;
import co.com.elbaiven.model.person.gateways.PersonRepository;
import co.com.elbaiven.model.utils.ModelListCompleteWithPages;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
public class PersonUseCase {
    private final PersonRepository personRepository;

    public Mono<Person> create(Person person) {
        return personRepository.create(person);
    }

    public Mono<Person> read(Long id) {
        return personRepository.read(id);
    }

    public Mono<Person> update(Long id, Person person) {
        return personRepository.update(id, person);
    }

    public Mono<Void> delete(Long id) {
        return personRepository.delete(id);
    }

    public Mono<ModelListCompleteWithPages> getAll(Integer page, Integer pageSize, String typeSearch, String search) {
        return personRepository.getAll(page, pageSize, typeSearch, search)
                .collectList()
                .flatMap(personList -> getCount(typeSearch, search)
                        .map(count -> ModelListCompleteWithPages.
                                getModelListCompleteWithPages(Arrays.asList(personList.toArray()), count, page + 1, pageSize)
                        )
                );
    }

    private Mono<Long> getCount(String typeSearch, String search) {
        Mono<Long> count ;
        switch (typeSearch) {
            case "identification":
                return personRepository.countFindByIdentification(search + '%');
            case "name":
                return personRepository.countFindByName(search + '%');
            case "phone":
                return personRepository.countFindByPhone(search + '%');
            default:
                return personRepository.count();
        }
    }

    public Mono<Boolean> existIdentification(Long identificacion) {
        return personRepository.existIdentification(identificacion);
    }
}

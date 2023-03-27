package co.com.elbaiven.person.service;

import co.com.elbaiven.api.exception.util.ErrorException;
import co.com.elbaiven.model.control.Control;
import co.com.elbaiven.model.control.gateways.ControlRepository;
import co.com.elbaiven.model.person.Person;
import co.com.elbaiven.model.person.gateways.PersonRepository;
import co.com.elbaiven.person.model.PersonModel;
import co.com.elbaiven.person.repository.PersonReactiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class PersonAdapterImpl implements PersonRepository {
    private final PersonReactiveRepository personReactiveRepository;

    public Mono<Person> create(Person person) {
        return personReactiveRepository.save(toPersonModel(person))
                .map((e) -> toPerson(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Person> read(Long id) {
        return personReactiveRepository.findById(id)
                .map((e) -> toPerson(e))
                .switchIfEmpty(Mono.defer(() -> {
                                    throw new ErrorException("404", "Person no encontrado");
                                }
                        )
                );
    }

    public Mono<Person> update(Long id, Person person) {
        person.setId(id);
        return personReactiveRepository.save(toPersonModel(person))
                .map((e) -> toPerson(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Void> delete(Long id) {
        return personReactiveRepository.deleteById(id)
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Flux<Person> getAll(Integer page, Integer pageSize, String typeSearch, String search) {
        return getListPersonByTypeSearch(page, pageSize, typeSearch, search)
                .map((e) -> toPerson(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });

    }

    public Mono<Boolean> existIdentification(Long identificacion) {
        return personReactiveRepository.findByIdentification(identificacion)
                .map(e -> true)
                .defaultIfEmpty(false);

    }

    public Mono<Long> count() {
        return personReactiveRepository.count();
    }

    public Mono<Long> countFindByName(String name) {
        return personReactiveRepository.countFindByName(name);
    }

    public Mono<Long> countFindByIdentification(String identification) {
        return personReactiveRepository.countFindByIdentification(identification);
    }

    public Mono<Long> countFindByPhone(String phone) {
        return personReactiveRepository.countFindByPhone(phone);
    }

    private Flux<PersonModel> getListPersonByTypeSearch(Integer page, Integer pageSize, String typeSearch, String search) {
        switch (typeSearch) {
            case "identification":
                return personReactiveRepository.findByIdentification(search + '%', pageSize, page * pageSize);
            case "name":
                return personReactiveRepository.findByName(search + '%', pageSize, page * pageSize);
            case "phone":
                return personReactiveRepository.findByPhone(search + '%', pageSize, page * pageSize);
            default:
                return personReactiveRepository.findAll(pageSize, page * pageSize);
        }
    }

    public static PersonModel toPersonModel(Person person) {
        return PersonModel.builder()
                .id(person.getId())
                .phone(person.getPhone())
                .address(person.getAddress())
                .name(person.getName())
                .identification(person.getIdentification())
                .build();
    }

    public static Person toPerson(PersonModel personModel) {
        return Person.builder()
                .id(personModel.getId())
                .identification(personModel.getIdentification())
                .name(personModel.getName())
                .phone(personModel.getPhone())
                .address(personModel.getAddress())
                .build();
    }
}

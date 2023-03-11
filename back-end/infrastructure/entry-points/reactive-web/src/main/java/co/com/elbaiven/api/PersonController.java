package co.com.elbaiven.api;

import co.com.elbaiven.model.person.Person;
import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.usecase.person.PersonUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "*",methods = {RequestMethod.POST,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.PUT})
@RequestMapping(value = "/api/person", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class PersonController {
    private final PersonUseCase personUseCase;

    @GetMapping
    public Flux<Person> getAll() {
        return  personUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<Person> getId(@PathVariable("id") Long id) {
        return  personUseCase.read(id);
    }

    @PostMapping()
    public Mono<Person> create(@RequestBody Person person) {
        return  personUseCase.create(person);
    }

    @PutMapping("{id}")
    public Mono<Person> update(@PathVariable("id") Long id, @RequestBody Person person) {
        return  personUseCase.update(id,person);
    }

    @DeleteMapping("{id}")
    public Mono<Void> delete(@PathVariable("id") Long id) {
        return  personUseCase.delete(id);
    }
}

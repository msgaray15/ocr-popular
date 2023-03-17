package co.com.elbaiven.api.person;

import co.com.elbaiven.api.ResponseAPI;
import co.com.elbaiven.model.person.Person;
import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.usecase.person.PersonUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = "/api/person", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class PersonController {
    private final PersonUseCase personUseCase;

    @GetMapping
    public Flux<Person> getAll() {
        return  personUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<ResponseAPI> getId(@PathVariable("id") Long id) {
        return  personUseCase.read(id)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @PostMapping()
    public Mono<ResponseAPI> create(@RequestBody Person person) {
        return  personUseCase.create(person)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @PutMapping("{id}")
    public Mono<ResponseAPI> update(@PathVariable("id") Long id, @RequestBody Person person) {
        return  personUseCase.update(id,person)
                .map(e -> ResponseAPI.getResponseAPI(e));

    }

    @DeleteMapping("{id}")
    public Mono<ResponseAPI> delete(@PathVariable("id") Long id) {
        return  personUseCase.delete(id)
                .map(e -> ResponseAPI.getResponseAPI("Eliminado exitosamente"));
    }
}

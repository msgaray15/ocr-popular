package co.com.elbaiven.api.person;

import co.com.elbaiven.api.ResponseAPI;
import co.com.elbaiven.api.person.inRQ.Identification;
import co.com.elbaiven.api.person.inRQ.PersonRQ;
import co.com.elbaiven.model.person.Person;
import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.model.utils.Constants;
import co.com.elbaiven.usecase.person.PersonUseCase;
import co.com.elbaiven.util.LoggerMessage;
import io.micrometer.core.lang.Nullable;
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
    private static final LoggerMessage loggerMessage = new LoggerMessage("Input Person");

    @GetMapping
    public Mono<ResponseAPI> getAll(
            @RequestParam(name = "page", defaultValue = Constants.DEFAULT_VALUE_PAGE) Integer page,
            @RequestParam(name = "pageSize", defaultValue = Constants.DEFAULT_VALUE_PAGE_SIZE) Integer pageSize,
            @Nullable @RequestParam(name = "typeSearch", defaultValue = Constants.DEFAULT_VALUE_TYPE_SEARCH) String typeSearch,
            @Nullable @RequestParam(name = "search") String search) {
        loggerMessage.loggerInfo("List( page: " + page + ", pageSize: " + pageSize + ", typeSearch: " + typeSearch + ", search: " + search + " )");
        return personUseCase.getAll(page - 1, pageSize, typeSearch, search)
                .map(ResponseAPI::getResponseAPI);
    }

    @GetMapping("{id}")
    public Mono<ResponseAPI> getId(@PathVariable("id") Long id) {
        loggerMessage.loggerInfo(" read: " + id);
        return personUseCase.read(id)
                .map(ResponseAPI::getResponseAPI);
    }

    @PostMapping()
    public Mono<ResponseAPI> create(@RequestBody PersonRQ personRQ) {
        loggerMessage.loggerInfo("create: " + personRQ.toString());
        return personUseCase.create(toPerson(personRQ))
                .map(ResponseAPI::getResponseAPI);
    }

    @PutMapping("{id}")
    public Mono<ResponseAPI> update(@PathVariable("id") Long id, @RequestBody PersonRQ personRQ) {
        loggerMessage.loggerInfo("update: " + personRQ.toString());
        return personUseCase.update(id, toPerson(personRQ))
                .map(ResponseAPI::getResponseAPI);

    }

    @DeleteMapping("{id}")
    public Mono<ResponseAPI> delete(@PathVariable("id") Long id) {
        loggerMessage.loggerInfo("delete: " + id);
        return personUseCase.delete(id)
                .map(e -> ResponseAPI.getResponseAPI("Eliminado exitosamente"));
    }

    @PostMapping("/existIdentification")
    public Mono<ResponseAPI> existIdentification(@RequestBody Identification identification) {
        loggerMessage.loggerInfo("existIdentification: " + identification.toString());
        return personUseCase.existIdentification(identification.getIdentification())
                .map(ResponseAPI::getResponseAPI);
    }

    private static Person toPerson(PersonRQ personRQ) {
        return Person.builder()
                .name(personRQ.getName())
                .address(personRQ.getAddress())
                .phone(personRQ.getPhone())
                .identification(personRQ.getIdentification())
                .build();
    }
}

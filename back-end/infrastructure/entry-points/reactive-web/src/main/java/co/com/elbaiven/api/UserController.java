package co.com.elbaiven.api;

import co.com.elbaiven.model.person.Person;
import co.com.elbaiven.model.user.User;
import co.com.elbaiven.usecase.person.PersonUseCase;
import co.com.elbaiven.usecase.user.UserUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "*",methods = {RequestMethod.POST,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.PUT})
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class UserController {
    private final UserUseCase userUseCase;

    @GetMapping
    public Flux<User> getAll() {
        return  userUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<User> getId(@PathVariable("id") Long id) {
        return  userUseCase.read(id);
    }

    @PostMapping("/create")
    public Mono<User> create(@RequestBody User user) {
        return  userUseCase.create(user);
    }

    @PutMapping("{id}/edit")
    public Mono<User> update(@PathVariable("id") Long id, @RequestBody User user) {
        return  userUseCase.update(id,user);
    }

    @DeleteMapping("delete/{id}")
    public Mono<Void> delete(@PathVariable("id") Long id) {
        return  userUseCase.delete(id);
    }
}

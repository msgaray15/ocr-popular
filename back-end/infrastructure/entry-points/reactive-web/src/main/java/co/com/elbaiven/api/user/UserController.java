package co.com.elbaiven.api.user;

import co.com.elbaiven.api.ResponseAPI;
import co.com.elbaiven.api.exception.util.ErrorException;
import co.com.elbaiven.api.user.inRQ.LoginRQ;
import co.com.elbaiven.model.user.User;
import co.com.elbaiven.usecase.user.UserUseCase;
import co.com.elbaiven.util.LoggerMessage;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class UserController {
    private final UserUseCase userUseCase;
    private static final LoggerMessage loggerMessage = new LoggerMessage("Input User");

    @GetMapping
    public Flux<User> getAll() {
        loggerMessage.loggerInfo("List");
        return  userUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<ResponseAPI> getId(@PathVariable("id") Long id) {
        loggerMessage.loggerInfo("Read: "+id);
        return  userUseCase.read(id)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @PostMapping()
    public Mono<ResponseAPI> create(@RequestBody User user) {
        loggerMessage.loggerInfo("Create: "+user.toString());
        return  userUseCase.create(user)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @PutMapping("{id}")
    public Mono<ResponseAPI> update(@PathVariable("id") Long id, @RequestBody User user) {
        loggerMessage.loggerInfo("Update: "+user.toString());
        return  userUseCase.update(id,user)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @DeleteMapping("{id}")
    public Mono<ResponseAPI> delete(@PathVariable("id") Long id) {
        loggerMessage.loggerInfo("Delete: "+id);
        return  userUseCase.delete(id)
                .map(e -> ResponseAPI.getResponseAPI("Borrado Exitosamente"));
    }

    @PostMapping("/login")
    public Mono<ResponseAPI> login (@RequestBody LoginRQ login){
        loggerMessage.loggerInfo("Login: "+login.toString());
        return userUseCase.login(login.getEmail(), login.getPassword())
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

}

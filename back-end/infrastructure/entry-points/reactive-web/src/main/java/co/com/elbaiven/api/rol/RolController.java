package co.com.elbaiven.api.rol;

import co.com.elbaiven.api.ResponseAPI;
import co.com.elbaiven.api.rol.inRQ.RolRQ;
import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.usecase.rol.RolUseCase;
import co.com.elbaiven.util.LoggerMessage;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = "/api/rol", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class RolController {
    private final RolUseCase rolUseCase;
    private static final LoggerMessage loggerMessage = new LoggerMessage("Input Rol");

    @GetMapping
    public Mono<ResponseAPI> getAll() {
        loggerMessage.loggerInfo("list");
        return  rolUseCase.getAll()
                .map(ResponseAPI::getResponseAPI);
    }

    @GetMapping("{id}")
    public Mono<ResponseAPI> getId(@PathVariable("id") Long id) {
        loggerMessage.loggerInfo("read: "+ id);
        return  rolUseCase.read(id)
                .map(ResponseAPI::getResponseAPI);
    }

    @PostMapping()
    public Mono<ResponseAPI> create(@RequestBody RolRQ rolRQ) {
        loggerMessage.loggerInfo("create: "+ rolRQ.toString());
        return  rolUseCase.create(toRol(rolRQ))
                .map(ResponseAPI::getResponseAPI);
    }

    @PutMapping("{id}")
    public Mono<ResponseAPI> update(@PathVariable("id") Long id, @RequestBody RolRQ rolRQ) {
        loggerMessage.loggerInfo("update: "+ rolRQ.toString());
        return  rolUseCase.update(id,toRol(rolRQ))
                .map(ResponseAPI::getResponseAPI);
    }

    @DeleteMapping("{id}")
    public Mono<ResponseAPI> delete(@PathVariable("id") Long id) {
        loggerMessage.loggerInfo("delete: "+ id);
        return  rolUseCase.delete(id)
                .map(e -> ResponseAPI.getResponseAPI("Eliminado Exitosamente"));
    }
    private static Rol toRol(RolRQ rolRQ){
        return Rol.builder()
                .name(rolRQ.getName())
                .build();
    }
}

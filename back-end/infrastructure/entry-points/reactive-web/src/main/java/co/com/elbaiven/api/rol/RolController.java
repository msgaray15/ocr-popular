package co.com.elbaiven.api.rol;

import co.com.elbaiven.api.ResponseAPI;
import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.usecase.rol.RolUseCase;
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

    @GetMapping
    public Flux<Rol> getAll() {
        return  rolUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<ResponseAPI> getId(@PathVariable("id") Long id) {
        return  rolUseCase.read(id)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @PostMapping()
    public Mono<ResponseAPI> create(@RequestBody Rol rol) {
        return  rolUseCase.create(rol)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @PutMapping("{id}")
    public Mono<ResponseAPI> update(@PathVariable("id") Long id, @RequestBody Rol rol) {
        return  rolUseCase.update(id,rol)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @DeleteMapping("{id}")
    public Mono<ResponseAPI> delete(@PathVariable("id") Long id) {
        return  rolUseCase.delete(id)
                .map(e -> ResponseAPI.getResponseAPI("Eliminado Exitosamente"));
    }
}

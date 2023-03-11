package co.com.elbaiven.api;

import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.usecase.rol.RolUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "*",methods = {RequestMethod.POST,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.PUT})
@RequestMapping(value = "/api/rol", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class RolController {
    private final RolUseCase rolUseCase;

    @GetMapping
    public Flux<Rol> getAll() {
        return  rolUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<Rol> getId(@PathVariable("id") Long id) {
        return  rolUseCase.read(id);
    }

    @PostMapping()
    public Mono<Rol> create(@RequestBody Rol rol) {
        return  rolUseCase.create(rol);
    }

    @PutMapping("{id}")
    public Mono<Rol> update(@PathVariable("id") Long id, @RequestBody Rol rol) {
        return  rolUseCase.update(id,rol);
    }

    @DeleteMapping("{id}")
    public Mono<Void> delete(@PathVariable("id") Long id) {
        return  rolUseCase.delete(id);
    }
}

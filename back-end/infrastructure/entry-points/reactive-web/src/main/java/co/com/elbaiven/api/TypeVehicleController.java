package co.com.elbaiven.api;

import co.com.elbaiven.model.typevehicle.TypeVehicle;
import co.com.elbaiven.model.user.User;
import co.com.elbaiven.usecase.typevehicle.TypeVehicleUseCase;
import co.com.elbaiven.usecase.user.UserUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "*",methods = {RequestMethod.POST,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.PUT})
@RequestMapping(value = "/api/typeVehicle", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class TypeVehicleController {
    private final TypeVehicleUseCase typeVehicleUseCase;

    @GetMapping
    public Flux<TypeVehicle> getAll() {
        return  typeVehicleUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<TypeVehicle> getId(@PathVariable("id") Long id) {
        return  typeVehicleUseCase.read(id);
    }

    @PostMapping()
    public Mono<TypeVehicle> create(@RequestBody TypeVehicle typeVehicle) {
        return  typeVehicleUseCase.create(typeVehicle);
    }

    @PutMapping("{id}")
    public Mono<TypeVehicle> update(@PathVariable("id") Long id, @RequestBody TypeVehicle typeVehicle) {
        return  typeVehicleUseCase.update(id,typeVehicle);
    }

    @DeleteMapping("{id}")
    public Mono<Void> delete(@PathVariable("id") Long id) {
        return  typeVehicleUseCase.delete(id);
    }
}

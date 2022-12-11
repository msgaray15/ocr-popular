package co.com.elbaiven.api;

import co.com.elbaiven.model.control.Control;
import co.com.elbaiven.model.vehicle.Vehicle;
import co.com.elbaiven.usecase.control.ControlUseCase;
import co.com.elbaiven.usecase.vehicle.VehicleUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "*",methods = {RequestMethod.POST,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.PUT})
@RequestMapping(value = "/api/control", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class ControlController {
    private final ControlUseCase controlUseCase;

    @GetMapping
    public Flux<Control> getAll() {
        return  controlUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<Control> getId(@PathVariable("id") Long id) {
        return  controlUseCase.read(id);
    }

    @PostMapping("/create")
    public Mono<Control> create(@RequestBody Control control) {
        return  controlUseCase.create(control);
    }

    @PutMapping("{id}/edit")
    public Mono<Control> update(@PathVariable("id") Long id, @RequestBody Control control) {
        return  controlUseCase.update(id,control);
    }

    @DeleteMapping("delete/{id}")
    public Mono<Void> delete(@PathVariable("id") Long id) {
        return  controlUseCase.delete(id);
    }
}

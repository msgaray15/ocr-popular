package co.com.elbaiven.api;

import co.com.elbaiven.model.state.State;
import co.com.elbaiven.model.vehicle.Vehicle;
import co.com.elbaiven.usecase.state.StateUseCase;
import co.com.elbaiven.usecase.vehicle.VehicleUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "*",methods = {RequestMethod.POST,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.PUT})
@RequestMapping(value = "/api/state", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class StateController {
    private final StateUseCase stateUseCase;

    @GetMapping
    public Flux<State> getAll() {
        return  stateUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<State> getId(@PathVariable("id") Long id) {
        return  stateUseCase.read(id);
    }

    @PostMapping()
    public Mono<State> create(@RequestBody State state) {
        return  stateUseCase.create(state);
    }

    @PutMapping("{id}")
    public Mono<State> update(@PathVariable("id") Long id, @RequestBody State state) {
        return  stateUseCase.update(id,state);
    }

    @DeleteMapping("{id}")
    public Mono<Void> delete(@PathVariable("id") Long id) {
        return  stateUseCase.delete(id);
    }
}

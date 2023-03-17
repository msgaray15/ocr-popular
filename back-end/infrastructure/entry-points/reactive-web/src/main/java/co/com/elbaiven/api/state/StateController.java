package co.com.elbaiven.api.state;

import co.com.elbaiven.api.ResponseAPI;
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
@RequestMapping(value = "/api/state", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class StateController {
    private final StateUseCase stateUseCase;

    @GetMapping
    public Flux<State> getAll() {
        return  stateUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<ResponseAPI> getId(@PathVariable("id") Long id) {
        return  stateUseCase.read(id)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @PostMapping()
    public Mono<ResponseAPI> create(@RequestBody State state) {
        return  stateUseCase.create(state)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @PutMapping("{id}")
    public Mono<ResponseAPI> update(@PathVariable("id") Long id, @RequestBody State state) {
        return  stateUseCase.update(id,state)
                .map(e -> ResponseAPI.getResponseAPI(e));

    }

    @DeleteMapping("{id}")
    public Mono<ResponseAPI> delete(@PathVariable("id") Long id) {
        return  stateUseCase.delete(id)
                .map(e -> ResponseAPI.getResponseAPI("Eliminado Exitosamente"));
    }
}

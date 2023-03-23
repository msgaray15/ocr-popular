package co.com.elbaiven.api.state;

import co.com.elbaiven.api.ResponseAPI;
import co.com.elbaiven.api.state.inRQ.StateRQ;
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
                .map(ResponseAPI::getResponseAPI);
    }

    @PostMapping()
    public Mono<ResponseAPI> create(@RequestBody StateRQ stateRQ) {
        return  stateUseCase.create(toState(stateRQ))
                .map(ResponseAPI::getResponseAPI);
    }

    @PutMapping("{id}")
    public Mono<ResponseAPI> update(@PathVariable("id") Long id, @RequestBody StateRQ stateRQ) {
        return  stateUseCase.update(id,toState(stateRQ))
                .map(ResponseAPI::getResponseAPI);

    }

    @DeleteMapping("{id}")
    public Mono<ResponseAPI> delete(@PathVariable("id") Long id) {
        return  stateUseCase.delete(id)
                .map(e -> ResponseAPI.getResponseAPI("Eliminado Exitosamente"));
    }

    private static State toState(StateRQ stateRQ){
        return State.builder()
                .name(stateRQ.getName())
                .build();
    }
}

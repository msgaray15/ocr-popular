package co.com.elbaiven.api.control;

import co.com.elbaiven.api.ResponseAPI;
import co.com.elbaiven.api.control.inRQ.PlacaExist;
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
@RequestMapping(value = "/api/control", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class ControlController {
    private final ControlUseCase controlUseCase;

    @GetMapping
    public Flux<Control> getAll() {
        return  controlUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<ResponseAPI> getId(@PathVariable("id") Long id) {
        return  controlUseCase.read(id)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @PostMapping()
    public Mono<ResponseAPI> create(@RequestBody Control control) {
        return  controlUseCase.create(control)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @PostMapping("exist")
    public Mono<ResponseAPI> placaExist(@RequestBody PlacaExist placaExist) {
        return  controlUseCase.placaExist(placaExist.getPlaca(), placaExist.getState())
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @PutMapping("{id}")
    public Mono<ResponseAPI> update(@PathVariable("id") Long id, @RequestBody Control control) {
        return  controlUseCase.update(id,control)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @DeleteMapping("{id}")
    public Mono<ResponseAPI> delete(@PathVariable("id") Long id) {
        return  controlUseCase.delete(id)
                .map(e -> ResponseAPI.getResponseAPI("Elimiando Exitosamente"));
    }
}

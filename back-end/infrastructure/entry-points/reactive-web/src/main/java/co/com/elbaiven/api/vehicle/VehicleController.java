package co.com.elbaiven.api.vehicle;

import co.com.elbaiven.api.ResponseAPI;
import co.com.elbaiven.model.user.User;
import co.com.elbaiven.model.vehicle.Vehicle;
import co.com.elbaiven.usecase.user.UserUseCase;
import co.com.elbaiven.usecase.vehicle.VehicleUseCase;
import co.com.elbaiven.util.LoggerMessage;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = "/api/vehicle", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class VehicleController {
    private final VehicleUseCase vehicleUseCase;

    @GetMapping
    public Flux<Vehicle> getAll() {
        return  vehicleUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<ResponseAPI> getId(@PathVariable("id") Long id) {
        return  vehicleUseCase.read(id)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @PostMapping()
    public Mono<ResponseAPI> create(@RequestBody Vehicle vehicle) {
        return  vehicleUseCase.create(vehicle)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @PutMapping("{id}")
    public Mono<ResponseAPI> update(@PathVariable("id") Long id, @RequestBody Vehicle vehicle) {
        return  vehicleUseCase.update(id,vehicle)
                .map(e -> ResponseAPI.getResponseAPI(e));
    }

    @DeleteMapping("{id}")
    public Mono<ResponseAPI> delete(@PathVariable("id") Long id) {
        return  vehicleUseCase.delete(id)
                .map(e -> ResponseAPI.getResponseAPI("Eliminado Exitosamente"));
    }
}

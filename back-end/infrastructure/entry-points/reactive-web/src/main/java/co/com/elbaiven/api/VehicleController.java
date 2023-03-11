package co.com.elbaiven.api;

import co.com.elbaiven.model.user.User;
import co.com.elbaiven.model.vehicle.Vehicle;
import co.com.elbaiven.usecase.user.UserUseCase;
import co.com.elbaiven.usecase.vehicle.VehicleUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "*",methods = {RequestMethod.POST,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.PUT})
@RequestMapping(value = "/api/vehicle", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class VehicleController {
    private final VehicleUseCase vehicleUseCase;

    @GetMapping
    public Flux<Vehicle> getAll() {
        return  vehicleUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<Vehicle> getId(@PathVariable("id") Long id) {
        return  vehicleUseCase.read(id);
    }

    @PostMapping()
    public Mono<Vehicle> create(@RequestBody Vehicle vehicle) {
        return  vehicleUseCase.create(vehicle);
    }

    @PutMapping("{id}")
    public Mono<Vehicle> update(@PathVariable("id") Long id, @RequestBody Vehicle vehicle) {
        return  vehicleUseCase.update(id,vehicle);
    }

    @DeleteMapping("{id}")
    public Mono<Void> delete(@PathVariable("id") Long id) {
        return  vehicleUseCase.delete(id);
    }
}

package co.com.elbaiven.api.vehicle;

import co.com.elbaiven.api.ResponseAPI;
import co.com.elbaiven.api.vehicle.inRQ.VehicleRQ;
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
    private static final LoggerMessage loggerMessage = new LoggerMessage("Input Vehicle");

    @GetMapping
    public Flux<Vehicle> getAll() {
        return  vehicleUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<ResponseAPI> getId(@PathVariable("id") Long id) {
        return  vehicleUseCase.read(id)
                .map(ResponseAPI::getResponseAPI);
    }

    @PostMapping()
    public Mono<ResponseAPI> create(@RequestBody VehicleRQ vehicleRQ) {
        return  vehicleUseCase.create(toVehicle(vehicleRQ))
                .map(ResponseAPI::getResponseAPI);
    }

    @PutMapping("{id}")
    public Mono<ResponseAPI> update(@PathVariable("id") Long id, @RequestBody VehicleRQ vehicleRQ) {
        return  vehicleUseCase.update(id,toVehicle(vehicleRQ))
                .map(ResponseAPI::getResponseAPI);
    }

    @DeleteMapping("{id}")
    public Mono<ResponseAPI> delete(@PathVariable("id") Long id) {
        return  vehicleUseCase.delete(id)
                .map(e -> ResponseAPI.getResponseAPI("Eliminado Exitosamente"));
    }
    private static Vehicle toVehicle(VehicleRQ vehicleRQ){
        return Vehicle.builder()
                .serial(vehicleRQ.getSerial())
                .idTypeVehicle(vehicleRQ.getIdTypeVehicle())
                .idUser(vehicleRQ.getIdUser())
                .licensePlate(vehicleRQ.getLicensePlate())
                .build();
    }
}

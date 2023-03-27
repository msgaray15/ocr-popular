package co.com.elbaiven.api.vehicle;

import co.com.elbaiven.api.ResponseAPI;
import co.com.elbaiven.api.vehicle.inRQ.VehicleRQ;
import co.com.elbaiven.model.user.User;
import co.com.elbaiven.model.utils.Constants;
import co.com.elbaiven.model.utils.ModelListCompleteWithPages;
import co.com.elbaiven.model.vehicle.Vehicle;
import co.com.elbaiven.usecase.user.UserUseCase;
import co.com.elbaiven.usecase.vehicle.VehicleUseCase;
import co.com.elbaiven.util.LoggerMessage;
import io.micrometer.core.lang.Nullable;
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
    public Mono<ResponseAPI> getAll(
            @RequestParam(name = "page", defaultValue = Constants.DEFAULT_VALUE_PAGE) Integer page,
            @RequestParam(name = "pageSize", defaultValue = Constants.DEFAULT_VALUE_PAGE_SIZE) Integer pageSize,
            @Nullable @RequestParam(name = "typeSearch", defaultValue = Constants.DEFAULT_VALUE_TYPE_SEARCH) String typeSearch,
            @Nullable @RequestParam(name = "search") String search) {
        loggerMessage.loggerInfo("List( page: " + page + ", pageSize: " + pageSize + ", typeSearch: " + typeSearch + ", search: " + search + " )");
        return vehicleUseCase.getAll(page - 1, pageSize, typeSearch, search)
                .map(ResponseAPI::getResponseAPI);
    }

    @GetMapping("{id}")
    public Mono<ResponseAPI> getId(@PathVariable("id") Long id) {
        loggerMessage.loggerInfo("Read: " + id);
        return vehicleUseCase.read(id)
                .map(ResponseAPI::getResponseAPI);
    }

    @PostMapping()
    public Mono<ResponseAPI> create(@RequestBody VehicleRQ vehicleRQ) {
        loggerMessage.loggerInfo("create: " + vehicleRQ.toString());
        return vehicleUseCase.create(toVehicle(vehicleRQ))
                .map(ResponseAPI::getResponseAPI);
    }

    @PutMapping("{id}")
    public Mono<ResponseAPI> update(@PathVariable("id") Long id, @RequestBody VehicleRQ vehicleRQ) {
        loggerMessage.loggerInfo("update: " + vehicleRQ.toString());
        return vehicleUseCase.update(id, toVehicle(vehicleRQ))
                .map(ResponseAPI::getResponseAPI);
    }

    @DeleteMapping("{id}")
    public Mono<ResponseAPI> delete(@PathVariable("id") Long id) {
        loggerMessage.loggerInfo("delete: " + id);
        return vehicleUseCase.delete(id)
                .map(e -> ResponseAPI.getResponseAPI("Eliminado Exitosamente"));
    }

    private static Vehicle toVehicle(VehicleRQ vehicleRQ) {
        return Vehicle.builder()
                .serial(vehicleRQ.getSerial())
                .idTypeVehicle(vehicleRQ.getIdTypeVehicle())
                .idUser(vehicleRQ.getIdUser())
                .licensePlate(vehicleRQ.getLicensePlate())
                .build();
    }
}

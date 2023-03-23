package co.com.elbaiven.api.typeVehicle;

import co.com.elbaiven.api.ResponseAPI;
import co.com.elbaiven.api.typeVehicle.inRQ.TypeVehicleRQ;
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
@RequestMapping(value = "/api/typeVehicle", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class TypeVehicleController {
    private final TypeVehicleUseCase typeVehicleUseCase;

    @GetMapping
    public Flux<TypeVehicle> getAll() {
        return  typeVehicleUseCase.getAll();
    }

    @GetMapping("{id}")
    public Mono<ResponseAPI> getId(@PathVariable("id") Long id) {
        return  typeVehicleUseCase.read(id)
                .map(ResponseAPI::getResponseAPI);
    }

    @PostMapping()
    public Mono<ResponseAPI> create(@RequestBody TypeVehicleRQ typeVehicleRQ) {
        return  typeVehicleUseCase.create(toTypeVehicle(typeVehicleRQ))
                .map(ResponseAPI::getResponseAPI);
    }

    @PutMapping("{id}")
    public Mono<ResponseAPI> update(@PathVariable("id") Long id, @RequestBody TypeVehicleRQ typeVehicleRQ) {
        return  typeVehicleUseCase.update(id,toTypeVehicle(typeVehicleRQ))
                .map(ResponseAPI::getResponseAPI);
    }

    @DeleteMapping("{id}")
    public Mono<ResponseAPI> delete(@PathVariable("id") Long id) {
        return  typeVehicleUseCase.delete(id)
                .map(e -> ResponseAPI.getResponseAPI("Eliminado Exitosamente"));
    }

    private static TypeVehicle toTypeVehicle(TypeVehicleRQ typeVehicleRQ){
        return TypeVehicle.builder()
                .name(typeVehicleRQ.getName())
                .build();
    }
}

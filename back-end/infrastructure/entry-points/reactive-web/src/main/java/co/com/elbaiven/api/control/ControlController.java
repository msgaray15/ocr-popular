package co.com.elbaiven.api.control;

import co.com.elbaiven.api.ResponseAPI;
import co.com.elbaiven.api.control.inRQ.ControlRQ;
import co.com.elbaiven.api.control.inRQ.PlacaExist;
import co.com.elbaiven.model.control.Control;
import co.com.elbaiven.model.utils.Constants;
import co.com.elbaiven.usecase.control.ControlUseCase;
import co.com.elbaiven.util.LoggerMessage;
import io.micrometer.core.lang.Nullable;
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
    private static final LoggerMessage loggerMessage = new LoggerMessage("Input Control");

    @GetMapping
    public Mono<ResponseAPI> getAll(
            @RequestParam(name = "page", defaultValue = Constants.DEFAULT_VALUE_PAGE) Integer page,
            @RequestParam(name = "pageSize", defaultValue = Constants.DEFAULT_VALUE_PAGE_SIZE) Integer pageSize,
            @Nullable @RequestParam(name = "typeSearch", defaultValue = Constants.DEFAULT_VALUE_TYPE_SEARCH) String typeSearch,
            @Nullable @RequestParam(name = "search") String search) {
        loggerMessage.loggerInfo("List( page: " + page + ", pageSize: " + pageSize + ", typeSearch: " + typeSearch + ", search: " + search + " )");
        return controlUseCase.getAll(page - 1, pageSize, typeSearch, search)
                .map(ResponseAPI::getResponseAPI);
    }

    @GetMapping("{id}")
    public Mono<ResponseAPI> getId(@PathVariable("id") Long id) {
        loggerMessage.loggerInfo("read: " + id);
        return controlUseCase.read(id)
                .map(ResponseAPI::getResponseAPI);
    }

    @PostMapping()
    public Mono<ResponseAPI> create(@RequestBody ControlRQ controlRQ) {
        loggerMessage.loggerInfo("create: " + controlRQ.toString());
        return controlUseCase.create(toControl(controlRQ))
                .map(ResponseAPI::getResponseAPI);
    }

    @PostMapping("exist")
    public Mono<ResponseAPI> placaExist(@RequestBody PlacaExist placaExist) {
        loggerMessage.loggerInfo("placaExist: " + placaExist.toString());
        return controlUseCase.placaExist(placaExist.getPlaca(), placaExist.getState())
                .map(ResponseAPI::getResponseAPI);
    }

    @PutMapping("{id}")
    public Mono<ResponseAPI> update(@PathVariable("id") Long id, @RequestBody ControlRQ controlRQ) {
        loggerMessage.loggerInfo("update: " + controlRQ.toString());
        return controlUseCase.update(id, toControl(controlRQ))
                .map(ResponseAPI::getResponseAPI);
    }

    @DeleteMapping("{id}")
    public Mono<ResponseAPI> delete(@PathVariable("id") Long id) {
        loggerMessage.loggerInfo("delete: " + id);
        return controlUseCase.delete(id)
                .map(e -> ResponseAPI.getResponseAPI("Elimiando Exitosamente"));
    }

    private static Control toControl(ControlRQ controlRQ) {
        return Control.builder()
                .date(controlRQ.getDate())
                .idState(controlRQ.getIdState())
                .idVehicle(controlRQ.getIdVehicle())
                .build();
    }

}

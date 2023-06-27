package co.com.elbaiven.api.control;

import co.com.elbaiven.api.ResponseAPI;
import co.com.elbaiven.api.control.inRQ.ControlRQ;
import co.com.elbaiven.api.control.inRQ.Register;
import co.com.elbaiven.api.exception.util.ErrorException;
import co.com.elbaiven.model.control.Control;
import co.com.elbaiven.model.utils.Constants;
import co.com.elbaiven.usecase.control.ControlUseCase;
import co.com.elbaiven.util.LoggerMessage;
import co.com.elbaiven.util.Recognition;
import io.micrometer.core.lang.Nullable;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;


@RestController
@RequestMapping(value = "/api/control", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class ControlController {
    private final ControlUseCase controlUseCase;
    private final Recognition recognition;
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
    public Mono<ResponseAPI> create(@RequestBody Register register, @RequestHeader HttpHeaders httpHeaders) {
        String clientId, clientSecret;
        clientId = httpHeaders.getFirst("client-id");
        clientSecret = httpHeaders.getFirst("client-secret");

        if (clientId == null || clientSecret == null)
            return Mono.error(new ErrorException("400", "El cliend-id  y client-secret Son obligatorios"));
        if (!clientId.equals(recognition.getClientId()) || !clientSecret.equals(recognition.getClientSecret()))
            return Mono.error(new ErrorException("400", "El cliend-id  y client-secret Son Incorrectas"));

        loggerMessage.loggerInfo("create: " + register.toString());
        return controlUseCase.create(register.getPlaca(), register.getState())
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

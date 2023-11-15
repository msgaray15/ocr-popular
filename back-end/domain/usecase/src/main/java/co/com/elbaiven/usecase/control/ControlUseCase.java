package co.com.elbaiven.usecase.control;

import co.com.elbaiven.model.control.Control;
import co.com.elbaiven.model.control.gateways.ControlRepository;
import co.com.elbaiven.model.state.State;
import co.com.elbaiven.model.state.gateways.StateRepository;
import co.com.elbaiven.model.utils.Constants;
import co.com.elbaiven.model.utils.GenericDatetimeFormatter;
import co.com.elbaiven.model.utils.ModelListCompleteWithPages;
import co.com.elbaiven.model.vehicle.Vehicle;
import co.com.elbaiven.model.vehicle.gateways.VehicleRepository;
import co.com.elbaiven.usecase.control.util.ControlVigilante;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

import java.time.format.DateTimeFormatter;
import java.util.Arrays;

@RequiredArgsConstructor
public class ControlUseCase {
    private final ControlRepository controlRepository;
    private final VehicleRepository vehicleRepository;
    private final StateRepository stateRepository;
    private final GenericDatetimeFormatter genericDatetimeFormatter;

    public Mono<Control> create(String placa, String state) {
        setControlVigilante(genericDatetimeFormatter.getDatetime(), ControlVigilante.DANGER, placa, state);
        Mono<State> stateMono = stateRepository.getName(state);
        Mono<Vehicle> vehicleMono = vehicleRepository.getLicensePlate(placa);
        return Mono.zip(vehicleMono, stateMono)
                .flatMap(tuple -> controlRepository.create(getControl(tuple.getT1().getId(), tuple.getT2().getId())))
                .flatMap(control -> {
                    setControlVigilante(control.getDate(), ControlVigilante.SUCCESS, placa, state);
                    return Mono.just(control);
                });
    }

    public void setControlVigilante(String date, String key, String placa, String state) {
        ControlVigilante.key = key;
        ControlVigilante.state = state;
        ControlVigilante.placa = placa;
        ControlVigilante.date = date;
    }

    public Mono<Control> read(Long id) {
        return controlRepository.read(id);
    }

    public Mono<String> getControlVigilante() {
        return Mono.just(ControlVigilante.toString);
    }

    public Mono<Control> update(Long id, Control control) {
        return controlRepository.update(id, control);
    }

    public Mono<Void> delete(Long id) {
        return controlRepository.delete(id);
    }

    public Mono<ModelListCompleteWithPages> getAll(Integer page, Integer pageSize, String typeSearch, String search) {
        return controlRepository.getAll(page, pageSize, typeSearch, search)
                .collectList()
                .flatMap(e -> getCount(typeSearch, search)
                        .map(count -> ModelListCompleteWithPages.
                                getModelListCompleteWithPages(Arrays.asList(e.toArray()), count, page + 1, pageSize)
                        )
                );
    }

    private Mono<Long> getCount(String typeSearch, String search) {
        switch (typeSearch) {
            case "date":
                return controlRepository.countFindByDate(search);
            case "idState":
                return controlRepository.countFindByIdState(Long.parseLong(search));
            case "idVehicle":
                return controlRepository.countFindByIdVehicle(Long.parseLong(search));
            default:
                return controlRepository.count();
        }
    }

    private Control getControl(Long idPlaca, Long idState) {
        genericDatetimeFormatter.setDateTimeFormatter(DateTimeFormatter.ofPattern(Constants.DATE_PATTERN));
        return Control.builder()
                .date(genericDatetimeFormatter.getDatetime())
                .idState(idState)
                .idVehicle(idPlaca)
                .build();
    }
}

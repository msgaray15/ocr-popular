package co.com.elbaiven.usecase.control;

import co.com.elbaiven.model.control.Control;
import co.com.elbaiven.model.control.gateways.ControlRepository;
import co.com.elbaiven.model.state.gateways.StateRepository;
import co.com.elbaiven.model.utils.Constants;
import co.com.elbaiven.model.utils.GenericDatetimeFormatter;
import co.com.elbaiven.model.vehicle.gateways.VehicleRepository;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
public class ControlUseCase {
    private final ControlRepository controlRepository;
    private final VehicleRepository vehicleRepository;
    private final StateRepository stateRepository;
    private final GenericDatetimeFormatter  genericDatetimeFormatter;

    public Mono<Control> create(Control control){
        return controlRepository.create(control);
    }
    public Mono<Control> placaExist(String placa, String state){

        return vehicleRepository.getLicensePlate(placa)
                .flatMap(vehicle -> stateRepository.getName(state)
                        .flatMap(rtaState->controlRepository.create(getControl(vehicle.getId(),rtaState.getId()))
                )
        );
    }

    public Mono<Control> read(Long id){
        return controlRepository.read(id);
    }

    public Mono<Control> update(Long id,Control control){
        return controlRepository.update(id,control);
    }

    public Mono<Void> delete(Long id){
        return controlRepository.delete(id);
    }

    public Flux<Control> getAll(){
        return controlRepository.getAll();
    }

    private Control getControl(Long idPlaca, Long idState){
        genericDatetimeFormatter.setDateTimeFormatter(DateTimeFormatter.ofPattern(Constants.DATE_PATTERN));
        return Control.builder()
                .date(genericDatetimeFormatter.getDatetime())
                .idState(idState)
                .idVehicle(idPlaca)
                .build();
    }
}

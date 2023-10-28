package co.com.elbaiven.control.service;

import co.com.elbaiven.api.exception.util.ErrorException;
import co.com.elbaiven.control.model.ControlModel;
import co.com.elbaiven.control.repository.ControlReactiveRepository;
import co.com.elbaiven.model.control.Control;
import co.com.elbaiven.model.control.ControlComplete;
import co.com.elbaiven.model.control.gateways.ControlRepository;
import co.com.elbaiven.model.state.State;
import co.com.elbaiven.model.vehicle.VehicleComplete;
import co.com.elbaiven.state.service.StateAdapterImpl;
import co.com.elbaiven.vehicle.service.VehicleAdapterImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;

@Service
@RequiredArgsConstructor
public class ControlAdapterImpl implements ControlRepository {
    private final ControlReactiveRepository controlReactiveRepository;
    private final StateAdapterImpl stateAdapterImpl;
    private final VehicleAdapterImpl vehicleAdapterImpl;

    public Mono<Control> create(Control control) {
        return controlReactiveRepository.save(toControlModel(control))
                .map(ControlAdapterImpl::toControl)
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Control> read(Long id) {
        return controlReactiveRepository.findById(id)
                .map(ControlAdapterImpl::toControl)
                .switchIfEmpty(Mono.defer(() -> {
                                    throw new ErrorException("404", "Control no encontrado");
                                }
                        )
                );
    }

    public Mono<Control> update(Long id, Control control) {
        control.setId(id);
        return controlReactiveRepository.save(toControlModel(control))
                .map(ControlAdapterImpl::toControl)
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Void> delete(Long id) {
        return controlReactiveRepository.deleteById(id)
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Long> count() {
        return controlReactiveRepository.count();
    }

    public Flux<ControlComplete> getAll(Integer page, Integer pageSize, String typeSearch, String search) {
        return getListControlByTypeSearch(page, pageSize, typeSearch, search)
                .flatMap((e) -> {
                    Mono<State> state = stateAdapterImpl.read(e.getIdState());
                    Mono<VehicleComplete> vehicleComplete = vehicleAdapterImpl.read(e.getIdVehicle());
                    return Mono.zip(state, vehicleComplete)
                            .map(tuple -> getControlComplete(e, tuple.getT1(), tuple.getT2()));
                })
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Long> countFindByDate(String date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        Timestamp dateStart, dateEnd;

        try {
            dateStart = new java.sql.Timestamp(dateFormat.parse(date.split("_")[0]).getTime());
            dateEnd = new java.sql.Timestamp(dateFormat.parse(date.split("_")[1]).getTime());
            return controlReactiveRepository.countFindByDate(dateStart, dateEnd);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

    }

    public Mono<Long> countFindByIdState(Long idState) {
        return controlReactiveRepository.countFindByIdState(idState);
    }

    public Mono<Long> countFindByIdVehicle(Long idVehicle) {
        return controlReactiveRepository.countFindByIdVehicle(idVehicle);
    }

    private static ControlComplete getControlComplete(ControlModel controlModel, State state, VehicleComplete vehicleComplete) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        return ControlComplete.builder()
                .id(controlModel.getId())
                .date(dateFormat.format(controlModel.getDate()))
                .state(state)
                .vehicle(vehicleComplete)
                .build();
    }

    public Flux<ControlModel> getListControlByTypeSearch(Integer page, Integer pageSize, String typeSearch, String search) {
        switch (typeSearch) {
            case "date":
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                Timestamp dateStart, dateEnd;

                try {
                    dateStart = new java.sql.Timestamp(dateFormat.parse(search.split("_")[0]).getTime());
                    dateEnd = new java.sql.Timestamp(dateFormat.parse(search.split("_")[1]).getTime());
                    return controlReactiveRepository.findByDate(dateStart, dateEnd, pageSize, page * pageSize);
                } catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            case "idState":
                return controlReactiveRepository.findByIdState(Long.parseLong(search), pageSize, page * pageSize);
            case "idVehicle":
                return controlReactiveRepository.findByIdVehicle(Long.parseLong(search), pageSize, page * pageSize);
            default:
                return controlReactiveRepository.findAll(pageSize, page * pageSize);
        }
    }

    public static ControlModel toControlModel(Control control) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        try {
            return ControlModel.builder()
                    .id(control.getId())
                    .date(new java.sql.Timestamp(dateFormat.parse(control.getDate()).getTime()))
                    .idState(control.getIdState())
                    .idVehicle(control.getIdVehicle())
                    .build();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    public static Control toControl(ControlModel controlModel) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        return Control.builder()
                .id(controlModel.getId())
                .idVehicle(controlModel.getIdVehicle())
                .idState(controlModel.getIdState())
                .date(dateFormat.format(controlModel.getDate()))
                .build();
    }
}

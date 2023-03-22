package co.com.elbaiven.control.service;

import co.com.elbaiven.api.exception.util.ErrorException;
import co.com.elbaiven.control.model.ControlModel;
import co.com.elbaiven.control.repository.ControlReactiveRepository;
import co.com.elbaiven.model.control.Control;
import co.com.elbaiven.model.control.gateways.ControlRepository;
import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.model.rol.gateways.RolRepository;
import co.com.elbaiven.rol.model.RolModel;
import co.com.elbaiven.rol.repository.RolReactiveRepository;
import co.com.elbaiven.vehicle.service.VehicleAdapterImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ControlAdapterImpl implements ControlRepository {
    private final ControlReactiveRepository controlReactiveRepository;

    public Mono<Control> create(Control control) {
        return controlReactiveRepository.save(toControlModel(control))
                .map((e) -> toControl(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Control> read(Long id) {
        return controlReactiveRepository.findById(id)
                .map((e) -> toControl(e))
                .switchIfEmpty(Mono.defer(() -> {
                                    throw new ErrorException("404", "Control no encontrado");
                                }
                        )
                );
    }

    public Mono<Control> update(Long id, Control control) {
        control.setId(id);
        return controlReactiveRepository.save(toControlModel(control))
                .map((e) -> toControl(e))
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

    public Flux<Control> getAll() {
        return controlReactiveRepository.findAll()
                .map((e) -> toControl(e));
    }

    public static ControlModel toControlModel(Control control) {
        return ControlModel.builder()
                .id(control.getId())
                .date(control.getDate())
                .idState(control.getIdState())
                .idVehicle(control.getIdVehicle())
                .build();
    }

    public static Control toControl(ControlModel controlModel) {
        return  Control.builder()
                .id(controlModel.getId())
                .idVehicle(controlModel.getIdVehicle())
                .idState(controlModel.getIdState())
                .date(controlModel.getDate())
                .build();
    }
}

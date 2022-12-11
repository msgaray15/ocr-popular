package co.com.elbaiven.control.service;

import co.com.elbaiven.control.model.ControlModel;
import co.com.elbaiven.control.repository.ControlReactiveRepository;
import co.com.elbaiven.model.control.Control;
import co.com.elbaiven.model.control.gateways.ControlRepository;
import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.model.rol.gateways.RolRepository;
import co.com.elbaiven.rol.model.RolModel;
import co.com.elbaiven.rol.repository.RolReactiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ControlAdapterImpl implements ControlRepository {
    private final ControlReactiveRepository controlReactiveRepository;

    public Mono<Control> create(Control control) {
        return !notNullFields(control) ?
                Mono.error(new Exception("Los campos no comple con los valores aceptados")):
                controlReactiveRepository.save(toControlModel(control))
                .map((e) -> toControl(e));
    }

    public Mono<Control> read(Long id) {
        return controlReactiveRepository.findById(id)
                .map((e) ->toControl(e));
    }

    public Mono<Control> update(Long id, Control control) {
        control.setId(id);
        return (id > 0 && !notNullFields(control)) ?
                Mono.error(new Exception("Los campos no comple con los valores aceptados")):
                controlReactiveRepository.save(toControlModel(control))
                        .map((e) ->toControl(e));
    }

    public Mono<Void> delete(Long id) {
        return id < 0 ? Mono.error(new Exception("El campo Id no comple con los valores aceptados")) :
                controlReactiveRepository.deleteById(id);
    }

    public Flux<Control> getAll() {
        return controlReactiveRepository.findAll()
                .map((e) ->toControl(e));
    }

    public static ControlModel toControlModel(Control control) {
        return new ControlModel(
                control.getId(),
                control.getDate(),
                control.getIdState(),
                control.getIdVehicle()
        );
    }

    public static Control toControl(ControlModel controlModel) {
        return new Control(
                controlModel.getId(),
                controlModel.getDate(),
                controlModel.getIdState(),
                controlModel.getIdVehicle()
        );
    }

    public static boolean notNullFields(Control control) {
        return (control.getDate() != null && control.getIdVehicle() > 0 && control.getIdState() > 0 );
    }
}

package co.com.elbaiven.usecase.control;

import co.com.elbaiven.model.control.Control;
import co.com.elbaiven.model.control.gateways.ControlRepository;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
public class ControlUseCase {
    private final ControlRepository controlRepository;

    public Mono<Control> create(Control control){
        return controlRepository.create(control);
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
}

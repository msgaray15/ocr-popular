package co.com.elbaiven.model.control.gateways;

import co.com.elbaiven.model.control.Control;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ControlRepository {
    Mono<Control> create(Control control);
    Mono<Control> read(Long id);
    Mono<Control> update(Long id,Control control);
    Mono<Void> delete(Long id);
    Flux<Control> getAll();
}

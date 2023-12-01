package co.com.elbaiven.model.control.gateways;

import co.com.elbaiven.model.control.Control;
import co.com.elbaiven.model.control.ControlComplete;
import co.com.elbaiven.model.control.ControlVigilante;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ControlRepository {
    Mono<Control> create(Control control);
    Mono<Control> read(Long id);
    Mono<Control> update(Long id,Control control);
    Mono<Void> delete(Long id);
    Mono<Long> count();
    Flux<ControlComplete> getAll(Integer page, Integer pageSize, String typeSearch, String search);
    Mono<Long> countFindByDate(String date);
    Mono<Long> countFindByIdState(Long idState);
    Mono<Long> countFindByIdVehicle(Long idVehicle);
    Mono<ControlVigilante> updateControlVigilante(ControlVigilante controlVigilante);
    Mono<ControlVigilante> getControlVigilanteMono();
}

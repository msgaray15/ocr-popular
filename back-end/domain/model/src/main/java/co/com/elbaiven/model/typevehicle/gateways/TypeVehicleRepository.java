package co.com.elbaiven.model.typevehicle.gateways;

import co.com.elbaiven.model.typevehicle.TypeVehicle;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TypeVehicleRepository {
    Mono<TypeVehicle> create(TypeVehicle TypeVehicle);
    Mono<TypeVehicle> read(Long id);
    Mono<TypeVehicle> update(Long id,TypeVehicle TypeVehicle);
    Mono<Void> delete(Long id);
    Flux<TypeVehicle> getAll();
}

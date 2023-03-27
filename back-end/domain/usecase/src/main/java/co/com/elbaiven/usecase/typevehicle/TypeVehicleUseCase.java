package co.com.elbaiven.usecase.typevehicle;

import co.com.elbaiven.model.state.State;
import co.com.elbaiven.model.state.gateways.StateRepository;
import co.com.elbaiven.model.typevehicle.TypeVehicle;
import co.com.elbaiven.model.typevehicle.gateways.TypeVehicleRepository;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RequiredArgsConstructor
public class TypeVehicleUseCase {
    private final TypeVehicleRepository typeVehicleRepository;

    public Mono<TypeVehicle> create(TypeVehicle typeVehicle){
        return typeVehicleRepository.create(typeVehicle);
    }

    public Mono<TypeVehicle> read(Long id){
        return typeVehicleRepository.read(id);
    }

    public Mono<TypeVehicle> update(Long id,TypeVehicle typeVehicle){
        return typeVehicleRepository.update(id,typeVehicle);
    }

    public Mono<Void> delete(Long id){
        return typeVehicleRepository.delete(id);
    }

    public Mono<List<TypeVehicle>> getAll(){
        return typeVehicleRepository.getAll()
                .collectList();
    }
}

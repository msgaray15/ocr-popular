package co.com.elbaiven.model.user.gateways;

import co.com.elbaiven.model.user.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserRepository {
    Mono<User> create(User User);
    Mono<User> read(Long id);
    Mono<User> update(Long id,User User);
    Mono<Void> delete(Long id);
    Flux<User> getAll();
}

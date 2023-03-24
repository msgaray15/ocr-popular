package co.com.elbaiven.model.user.gateways;

import co.com.elbaiven.model.user.Login;
import co.com.elbaiven.model.user.User;
import co.com.elbaiven.model.user.UserComplete;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserRepository {
    Mono<User> create(User User);
    Mono<UserComplete> read(Long id);
    Mono<Login> login(String email, String password);
    Mono<Boolean> existEmail(String email);
    Mono<User> update(Long id,User User);
    Mono<Void> delete(Long id);
    Flux<User> getAll();
}

package co.com.elbaiven.user.repository;

import co.com.elbaiven.user.model.UserModel;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

// TODO: This file is just an example, you should delete or modify it
public interface UserReactiveRepository extends ReactiveCrudRepository<UserModel, Long> {
    Mono<UserModel> findByEmailAndPassword(String user, String password);
}

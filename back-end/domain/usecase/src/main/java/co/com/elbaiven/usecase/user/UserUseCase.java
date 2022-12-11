package co.com.elbaiven.usecase.user;

import co.com.elbaiven.model.user.User;
import co.com.elbaiven.model.user.gateways.UserRepository;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
public class UserUseCase {
    private final UserRepository userRepository;

    public Mono<User> create(User user){
        return userRepository.create(user);
    }

    public Mono<User> read(Long id){
        return userRepository.read(id);
    }

    public Mono<User> update(Long id,User user){
        return userRepository.update(id,user);
    }

    public Mono<Void> delete(Long id){
        return userRepository.delete(id);
    }

    public Flux<User> getAll(){
        return userRepository.getAll();
    }
}

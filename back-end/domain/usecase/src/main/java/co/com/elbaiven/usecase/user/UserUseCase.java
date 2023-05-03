package co.com.elbaiven.usecase.user;

import co.com.elbaiven.model.user.Login;
import co.com.elbaiven.model.user.User;
import co.com.elbaiven.model.user.UserComplete;
import co.com.elbaiven.model.user.gateways.UserRepository;
import co.com.elbaiven.model.utils.ModelListCompleteWithPages;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Arrays;

@RequiredArgsConstructor
public class UserUseCase {
    private final UserRepository userRepository;

    public Mono<User> create(User user) {
        return userRepository.create(user);
    }

    public Mono<UserComplete> read(Long id) {
        return userRepository.read(id);
    }

    public Mono<User> update(Long id, User user) {
        return user.getPassword() == null ?
                userRepository.update(id, user.getIdRol(), user.getEmail())
                :
                userRepository.update(id, user);
    }

    public Mono<Void> delete(Long id) {
        return userRepository.delete(id);
    }

    public Mono<ModelListCompleteWithPages> getAll(Integer page, Integer pageSize, String typeSearch, String search) {
        return userRepository.getAll(page, pageSize, typeSearch, search)
                .collectList()
                .flatMap(e -> getCount(typeSearch, search)
                        .map(count -> ModelListCompleteWithPages.
                                getModelListCompleteWithPages(Arrays.asList(e.toArray()), count, page + 1, pageSize)
                        )
                );
    }

    public Mono<Login> login(String email, String password) {

        return userRepository.login(email, password);
    }

    public Mono<Boolean> existEmail(String email) {

        return userRepository.existEmail(email);
    }

    private Mono<Long> getCount(String typeSearch, String search) {
        switch (typeSearch) {
            case "email":
                return userRepository.countFindByEmail(search + '%');
            case "idRol":
                return userRepository.countFindByIdRol(Long.parseLong(search));
            default:
                return userRepository.count();
        }
    }

}

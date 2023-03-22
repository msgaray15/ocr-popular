package co.com.elbaiven.user.service;

import co.com.elbaiven.adapter.JWTOperations;
import co.com.elbaiven.api.exception.util.ErrorException;
import co.com.elbaiven.model.person.Person;
import co.com.elbaiven.model.person.gateways.PersonRepository;
import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.model.user.Login;
import co.com.elbaiven.model.user.User;
import co.com.elbaiven.model.user.UserComplete;
import co.com.elbaiven.model.user.gateways.UserRepository;
import co.com.elbaiven.person.model.PersonModel;
import co.com.elbaiven.person.repository.PersonReactiveRepository;
import co.com.elbaiven.person.service.PersonAdapterImpl;
import co.com.elbaiven.rol.model.RolModel;
import co.com.elbaiven.rol.repository.RolReactiveRepository;
import co.com.elbaiven.rol.service.RolAdapterImpl;
import co.com.elbaiven.user.model.UserModel;
import co.com.elbaiven.user.repository.UserReactiveRepository;
import co.com.elbaiven.util.LoggerMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.CoreSubscriber;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class UserAdapterImpl implements UserRepository {
    private final UserReactiveRepository userReactiveRepository;
    private final PersonAdapterImpl personAdapterImpl;
    private final RolAdapterImpl rolAdapterImpl;
    private static final LoggerMessage loggerMessage = new LoggerMessage("Out User");

    public Mono<User> create(User user) {
        return userReactiveRepository.save(toUserModel(user))
                .map((e) -> toUser(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<UserComplete> read(Long id) {
        return userReactiveRepository.findById(id)
                .flatMap((e) -> {
                    Mono<Person> person = personAdapterImpl.read(e.getIdPerson());
                    Mono<Rol> rol = rolAdapterImpl.read(e.getIdRol());
                    return Mono.zip(person, rol)
                            .map(tuple -> getUserComplete(e, tuple.getT1(), tuple.getT2()));
                })
                .switchIfEmpty(Mono.defer(() -> {
                    throw new ErrorException("404", "No existe Usuario con el Id: " + id.toString());
                }));
    }

    public Mono<Login> login(String email, String password) {
        return userReactiveRepository.findByEmailAndPassword(email, password)
                .flatMap((e) -> {
                    Mono<Person> person = personAdapterImpl.read(e.getIdPerson());
                    Mono<Rol> rol = rolAdapterImpl.read(e.getIdRol());
                    return Mono.zip(person, rol)
                            .map(tuple -> getLogin(e, tuple.getT1(), tuple.getT2()));
                })
                .switchIfEmpty(Mono.defer(() -> {
                    throw new ErrorException("200", "Usuario o contraseña son incorrectos");
                }));
    }

    public Mono<User> update(Long id, User user) {
        user.setId(id);
        return userReactiveRepository.save(toUserModel(user))
                .map((e) -> toUser(e))
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Void> delete(Long id) {
        return userReactiveRepository.deleteById(id)
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Flux<User> getAll() {
        return userReactiveRepository.findAll()
                .map((e) -> toUser(e));
    }

    private static UserModel toUserModel(User user) {
        return UserModel.builder()
                .id(user.getId())
                .idPerson(user.getIdPerson())
                .idRol(user.getIdRol())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
    }

    private static User toUser(UserModel userModel) {
        User user = User.builder()
                .id(userModel.getId())
                .email(userModel.getEmail())
                .idRol(userModel.getIdRol())
                .idPerson(userModel.getIdPerson())
                .password(userModel.getPassword())
                .build();
        loggerMessage.loggerInfo(user.toString());
        return user;
    }

    private Login getLogin(UserModel userModel, Person person, Rol rol) {
        Login login = Login.builder()
                .user(userModel.getEmail())
                .token(JWTOperations.getJWTToken(getUserComplete(userModel, person, rol)))
                .build();
        loggerMessage.loggerInfo(login.toString());
        return login;
    }

    private UserComplete getUserComplete(UserModel userModel, Person person, Rol rol) {
        UserComplete userComplete = UserComplete.builder()
                .id(userModel.getId())
                .person(person)
                .rol(rol)
                .email(userModel.getEmail())
                .build();
        loggerMessage.loggerInfo(userComplete.toString());
        return userComplete;
    }


}

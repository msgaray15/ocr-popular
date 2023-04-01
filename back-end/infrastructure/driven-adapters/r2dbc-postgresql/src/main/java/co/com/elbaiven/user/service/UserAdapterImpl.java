package co.com.elbaiven.user.service;

import co.com.elbaiven.adapter.JWTOperations;
import co.com.elbaiven.api.exception.util.ErrorException;
import co.com.elbaiven.model.person.Person;
import co.com.elbaiven.model.rol.Rol;
import co.com.elbaiven.model.user.Login;
import co.com.elbaiven.model.user.User;
import co.com.elbaiven.model.user.UserComplete;
import co.com.elbaiven.model.user.gateways.UserRepository;
import co.com.elbaiven.person.service.PersonAdapterImpl;
import co.com.elbaiven.rol.service.RolAdapterImpl;
import co.com.elbaiven.user.model.UserModel;
import co.com.elbaiven.user.repository.UserReactiveRepository;
import co.com.elbaiven.vehicle.model.VehicleModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Service
@RequiredArgsConstructor
public class UserAdapterImpl implements UserRepository {
    private final UserReactiveRepository userReactiveRepository;
    private final PersonAdapterImpl personAdapterImpl;
    private final RolAdapterImpl rolAdapterImpl;

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

    public Mono<Boolean> existEmail(String email) {
        return userReactiveRepository.findByEmail(email)
                .map(e -> true)
                .defaultIfEmpty(false);
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

    public Mono<Long> count() {
        return userReactiveRepository.count();
    }

    public Flux<UserComplete> getAll(Integer page, Integer pageSize, String typeSearch, String search) {
        return getListUserByTypeSearch(page, pageSize, typeSearch, search)
                .flatMap((e) -> {
                    Mono<Person> person = personAdapterImpl.read(e.getIdPerson());
                    Mono<Rol> rol = rolAdapterImpl.read(e.getIdRol());
                    return Mono.zip(person, rol)
                            .map(tuple -> getUserComplete(e, tuple.getT1(), tuple.getT2()));
                })
                .doOnError(err -> {
                    throw new ErrorException("400", err.getMessage());
                });
    }

    public Mono<Long> countFindByIdRol(Long idRol) {
        return userReactiveRepository.countFindByIdRol(idRol);
    }

    public Mono<Long> countFindByEmail(String user) {
        return userReactiveRepository.countFindByEmail(user);
    }

    private Flux<UserModel> getListUserByTypeSearch(Integer page, Integer pageSize, String typeSearch, String search) {
        switch (typeSearch) {
            case "email":
                return userReactiveRepository.findByEmail(search + '%', pageSize, page * pageSize);
            case "idRol":
                return userReactiveRepository.findByIdRol(Long.parseLong(search), pageSize, page * pageSize);
            default:
                return userReactiveRepository.findAll(pageSize, page * pageSize);
        }
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
        return user;
    }

    private Login getLogin(UserModel userModel, Person person, Rol rol) {
        Login login = Login.builder()
                .user(userModel.getEmail())
                .token(JWTOperations.getJWTToken(getUserComplete(userModel, person, rol)))
                .build();
        return login;
    }

    private UserComplete getUserComplete(UserModel userModel, Person person, Rol rol) {
        UserComplete userComplete = UserComplete.builder()
                .id(userModel.getId())
                .person(person)
                .rol(rol)
                .email(userModel.getEmail())
                .build();
        return userComplete;
    }


}

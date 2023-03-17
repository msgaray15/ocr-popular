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
    private  final PersonAdapterImpl personAdapterImpl;
    private final RolAdapterImpl rolAdapterImpl;
    private final LoggerMessage loggerMessage = new LoggerMessage("Output User");

    public Mono<User> create(User  user) {
        return !notNullFields(user) ?
                Mono.error(new Exception("Los campos no comple con los valores aceptados")):
                userReactiveRepository.save(toUserModel(user))
                .map((e) -> toUser(e));
    }

    public Mono<UserComplete> read(Long id) {
        return userReactiveRepository.findById(id)
                .flatMap((e) ->{
                    Mono<Person> person = personAdapterImpl.read(e.getIdPerson());
                    Mono<Rol> rol = rolAdapterImpl.read(e.getIdRol());
                    return Mono.zip(person, rol)
                            .map(tuple ->getUserComplete(e,tuple.getT1(),tuple.getT2()));
                })
                .switchIfEmpty(Mono.defer(()->{
                    throw new ErrorException("200","No existe Usuario con el Id: "+id.toString());
                }));
    }

    public Mono<Login> login(String email, String password) {
        return userReactiveRepository.findByEmailAndPassword(email,password)
                .flatMap((e) ->{
                    Mono<Person> person = personAdapterImpl.read(e.getIdPerson());
                    Mono<Rol> rol = rolAdapterImpl.read(e.getIdRol());
                    return Mono.zip(person, rol)
                            .map(tuple ->getLogin(e,tuple.getT1(),tuple.getT2()));
                })
                .switchIfEmpty(Mono.defer(()->{
                    throw new ErrorException("200","Usuario o contraseña son incorrectos");
                }));
    }

    private Void aux (){
        throw new ErrorException("200","Usuario o contraseña son incorrectos");
    }

    private Login getLogin(UserModel userModel, Person person, Rol rol){
        Login login = Login.builder()
                .user(userModel.getEmail())
                .token(JWTOperations.getJWTToken(getUserComplete(userModel, person, rol)))
                .build();
        loggerMessage.loggerInfo(login.toString());
        return login;
    }
    private UserComplete getUserComplete (UserModel userModel, Person person, Rol rol){
        return UserComplete.builder()
                .id(userModel.getId())
                .person(person)
                .rol(rol)
                .email(userModel.getEmail())
                .build();
    }
    public Mono<User> update(Long id, User user) {
        user.setId(id);
        return (id > 0 && !notNullFields(user)) ?
                Mono.error(new Exception("Los campos no comple con los valores aceptados")):
                userReactiveRepository.save(toUserModel(user))
                        .map((e) ->toUser(e));
    }

    public Mono<Void> delete(Long id) {
        return id < 0 ? Mono.error(new Exception("El campo Id no comple con los valores aceptados")) :
                userReactiveRepository.deleteById(id);
    }

    public Flux<User> getAll() {
        return userReactiveRepository.findAll()
                .map((e) ->toUser(e));
    }

    public static UserModel toUserModel(User user) {
        return new UserModel(
                user.getId(),
                user.getIdPerson(),
                user.getIdRol(),
                user.getEmail(),
                user.getPassword()
        );
    }

    public static User toUser(UserModel userModel) {
        return new User(
                userModel.getId(),
                userModel.getIdPerson(),
                userModel.getIdRol(),
                userModel.getEmail(),
                userModel.getPassword()
        );
    }

    public static boolean notNullFields(User user) {
        return (user.getIdPerson() > 0 && user.getIdRol() > 0 && user.getEmail().length() > 0 && user.getPassword().length() > 0 );
    }
}

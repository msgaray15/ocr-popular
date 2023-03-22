package co.com.elbaiven.config;

import co.com.elbaiven.model.utils.Constants;
import co.com.elbaiven.model.utils.GenericDatetimeFormatter;
import co.com.elbaiven.usecase.control.ControlUseCase;
import co.com.elbaiven.util.LoggerMessage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DefaultBeansConfig {

    @Bean(name = "genericDatetimeFormatter")
    public GenericDatetimeFormatter getGenericDatetimeFormatter(){
        return new GenericDatetimeFormatter("yyyy-MM-dd HH:mm:ss","America/Bogota");
    }

}

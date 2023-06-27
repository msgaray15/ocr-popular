package co.com.elbaiven.adapter;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .addFilterAfter(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/user").permitAll()
                .antMatchers(HttpMethod.POST, "/api/user/login").permitAll()
                .antMatchers(HttpMethod.POST, "/api/user/existEmail").permitAll()
                .antMatchers(HttpMethod.POST, "/api/person/existIdentification").permitAll()
                .antMatchers(HttpMethod.POST, "/api/person").permitAll()
                .antMatchers(HttpMethod.POST, "/api/control").permitAll()
                .anyRequest().authenticated();
    }
}

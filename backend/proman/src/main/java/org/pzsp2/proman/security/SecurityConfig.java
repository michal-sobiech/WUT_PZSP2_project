package org.pzsp2.proman.security;


import org.pzsp2.proman.database_management.tables.user.dto.UserDTO;
import org.pzsp2.proman.database_management.tables.user.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.ArrayList;
import java.util.List;
import org.pzsp2.proman.database_management.tables.admin.service.AdminServiceImpl;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.pzsp2.proman.database_management.DatabaseManager;
// import org.pzsp2.proman.database_management.*;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final RSAKeyProperties rsaKeyProperties;

    public SecurityConfig(RSAKeyProperties rsaKeyProperties) {
        this.rsaKeyProperties = rsaKeyProperties;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) 
    throws Exception {
        return http
            .cors(Customizer.withDefaults())
            .csrf().disable() //AbstractHttpConfigurer::disable).disable()
            .authorizeHttpRequests( auth -> 
                auth
                .anyRequest()
                .permitAll()
            )
            .sessionManagement(session -> 
                session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
            .build();
    }

    // @Bean
    // public JWKSource<SecurityContext> jwkSource() {
    //     KeyPair keyPair = EncryptionUtils.generateRSAKeyPair();
    //     rsaKey = EncryptionUtils.generateRSAKey(keyPair);

    //     JWKSet jwkSet = new JWKSet(rsaKey);
    //     return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet);
    // }

    @Bean
    JwtEncoder jwtEncoder() {
        RSAPublicKey rsaPublicKey = rsaKeyProperties.getPublicKey();
        RSAPrivateKey rsaPrivateKey = rsaKeyProperties.getPrivateKey();
        JWK jwk = new RSAKey.Builder(rsaPublicKey).privateKey(rsaPrivateKey).build();
		JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
		return new NimbusJwtEncoder(jwks);
    }

    @Bean
    JwtDecoder jwtDecoder() {
          RSAPublicKey rsaPublicKey = rsaKeyProperties.getPublicKey();
      return NimbusJwtDecoder.withPublicKey(rsaPublicKey).build();
    }

    @Bean
    public AuthenticationManager authManager(UserDetailsService userDetailsService) {
        var authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        return new ProviderManager(authProvider);
    }

    @Bean
    public UserDetailsService userDetailsService(UserServiceImpl userServiceImpl,
            AdminServiceImpl adminServiceImpl) {
        return new UserDetailsServiceImpl(userServiceImpl, adminServiceImpl);
    }

        // System.out.println("Encoded password: " +passwordEncoder().encode("password"));
        
        // List<UserDTO> userData = userServiceImpl.getAllUsers();
        // ArrayList<UserDetails> users = new ArrayList<>();
        // for (UserDTO dataSet : userData) {
        //     System.out.println(dataSet.username());
        //     System.out.println(dataSet.password());
        //     users.add(
        //         User
        //         .withUsername(dataSet.username())
        //         .password("{noop}" + dataSet.password())
        //         .authorities("read")
        //         .build()
        //     );
        // }
        // return new InMemoryUserDetailsManager(
        //     users
        //     // User
        //     // .withUsername("user1")
        //     // .password("{bcrypt}" + passwordEncoder().encode("password"))
        //     // .authorities("read")
        //     // .build(),
        //     // User
        //     // .withUsername("user2")
        //     // .password("{bcrypt}" + passwordEncoder().encode("password"))
        //     // .authorities("read")
        //     // .build(),
        //     // User
        //     // .withUsername("user3")
        //     // .password("{bcrypt}" + passwordEncoder().encode("password"))
        //     // .authorities("read")
        //     // .build()
        // );
    // }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // @Bean
    // public JwtAccessTokenConverter accessTokenConverter(){
    //     JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
    //     KeyStoreKeyFactory keyStoreKeyFactory = 
    //     new KeyStoreKeyFactory(new ClassPathResource("mytest.jks"), "mypass".toCharArray());
    //     converter.setKeyPair(keyStoreKeyFactory.getKeyPair("mytest"));
    //     return converter;
    // }

}
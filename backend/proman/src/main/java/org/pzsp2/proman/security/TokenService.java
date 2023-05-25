package org.pzsp2.proman.security;


import java.time.Instant;
import java.time.temporal.ChronoUnit;


import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.JwtValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class TokenService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TokenService.class);
    private final JwtEncoder encoder;
    private final JwtDecoder decoder;

    public TokenService(JwtEncoder encoder, JwtDecoder decoder) {
        this.encoder = encoder;
        this.decoder = decoder;   
    }

    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet
            .builder()
            .issuedAt(now)
            .expiresAt(now.plus(1, ChronoUnit.DAYS))
            .subject(authentication.getName())
            .build();
        return encoder.encode(
            JwtEncoderParameters
            .from(claims)
        ).getTokenValue();
    }

    public Jwt getJwt(String JWTString) throws JwtValidationException{
        try {
            return decoder.decode(JWTString);
        } catch (JwtException e) {
            // ArrayList<Exception> errors = new ArrayList<Exception>();
            // errors.add(ex);
            throw new JwtException(e.getMessage(), null);
        }
    }

    public Authentication getAuthentication(Jwt JWT) throws JwtException {
        String subject = JWT.getSubject();
        System.out.println("Auth subject: " + subject);
        Authentication auth = new UsernamePasswordAuthenticationToken(subject, null);
        return auth;
    }

    public boolean isTokenValid(String JWTString) {
        try {
            Authentication authentication = getAuthentication(getJwt(JWTString));
            // SecurityContextHolder.getContext().setAuthentication(authentication);
            return true;
        } catch (JwtException ex) {
            System.out.println("Invalid JWT token");
            return false;
        }
    }

    public String getJWTUsername(String JWTString) {
        try {
            Jwt JWT = decoder.decode(JWTString);
            return JWT.getSubject();
        } catch (JwtException ex) {
            System.out.println("Invalid JWT token");
        }
        return null;
    }

    public Authentication getAuthentication(String JWTString) {
        return getAuthentication(getJwt(JWTString));
    }
}
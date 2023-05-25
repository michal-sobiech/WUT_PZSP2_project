package org.pzsp2.proman.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import java.io.IOException;
import org.json.JSONObject;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
// import org.pzsp2.proman.database_management.DatabaseManager;

import java.io.PrintWriter;

import org.springframework.security.core.Authentication;


@Component
@Order(1)
public class JWTTokenFilter extends OncePerRequestFilter {

    // private static final Logger LOGGER = LoggerFactory.getLogger(JWTTokenFilter.class);
    // private final DatabaseManager databaseManager;

    public JWTTokenFilter() {
        // this.databaseManager = new DatabaseManager();
    }

    @Autowired
    private TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("Filtr JWT");
        
        // permitAll() does not work for this filter for some reason,
        // so a URL check is needed
        String URL = request.getRequestURL().toString();

        // Everybody can try to log in
        if (URL.contains("/log_in")) {
            doFilter(request, response, filterChain);
            return;
        }

        // For protected routes
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null) {
                return;
            }
            String token = authHeader.substring(7);
            if (tokenService.isTokenValid(token)) {
                System.out.println("Token is valid");

                // Still need to check if the role is right
                String userURI = "/user_home";
                String adminURI = "/admin_home";
                String ownerURI = "/owner_home";

                Authentication auth = tokenService.getAuthentication(token);
                String role = (String) auth.getPrincipal();

                System.out.println("ROLE: " + role);

                if ((URL.contains(userURI) && role.equals("user"))
                        || (URL.contains(adminURI) && role.equals("admin"))
                        || (URL.contains(ownerURI) && role.equals("owner"))) {
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    doFilter(request, response, filterChain);
                    return;
                }
                System.out.println("ERRR");
            }
        } catch(JwtException e) {
            System.out.println("Token is invalid");

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("status", "failure");

            PrintWriter writer = response.getWriter();
            writer.write(jsonObject.toString());
            writer.close();
        }
    }
}

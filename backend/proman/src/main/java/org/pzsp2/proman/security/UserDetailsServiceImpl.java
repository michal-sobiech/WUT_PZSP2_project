package org.pzsp2.proman.security;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.pzsp2.proman.database_management.tables.admin.service.AdminServiceImpl;
import org.pzsp2.proman.database_management.tables.user.service.UserServiceImpl;
import org.pzsp2.proman.database_management.tables.user.dto.UserDTO;
import org.pzsp2.proman.database_management.tables.admin.dto.AdminDTO;
import org.pzsp2.proman.database_management.tables.admin.model.Admin;
import java.util.List;
import org.springframework.security.core.userdetails.User;

public class UserDetailsServiceImpl implements UserDetailsService{

    private final UserServiceImpl userServiceImpl;
    private final AdminServiceImpl adminServiceImpl;

    public UserDetailsServiceImpl(UserServiceImpl userServiceImpl,
            AdminServiceImpl adminServiceImpl) {
        this.userServiceImpl = userServiceImpl;
        this.adminServiceImpl = adminServiceImpl;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        List<UserDTO> users = userServiceImpl.getAllUsers();
        for (UserDTO user : users) {
            if (user.username().equals(username)) {
                return User
                    .withUsername(username)
                    .password("{noop}" + user.password())
                    .authorities("user")
                    .build();
            }
        }
        List<Admin> admins = adminServiceImpl.getAllAdmins();
        for (Admin admin : admins) {
            System.out.println("aaa" + admin.getLogin() + username);
            if (admin.getLogin().equals(username)) {
                return User
                    .withUsername(username)
                    .password("{noop}" + admin.getPassword())
                    .authorities("admin")
                    .build();
            }
        }
        throw new UsernameNotFoundException(username);
    }

}

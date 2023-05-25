package org.pzsp2.proman.database_management.tables.user.dto;

import org.pzsp2.proman.database_management.tables.user.model.User;

import java.io.Serializable;

public record UserDTO(long userId, String username, String password, String email) implements Serializable {
    public static UserDTO of(final User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getPassword(), user.getEmail());
    }
}
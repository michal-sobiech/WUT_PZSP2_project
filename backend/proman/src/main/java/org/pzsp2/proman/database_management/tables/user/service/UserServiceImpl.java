package org.pzsp2.proman.database_management.tables.user.service;

import org.pzsp2.proman.database_management.tables.user.dto.UserDTO;
import org.pzsp2.proman.database_management.tables.user.model.User;
import org.pzsp2.proman.database_management.tables.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(UserDTO::of).toList();
    }

    public UserDTO getUserById(long userId) {
        return UserDTO.of(Objects.requireNonNull(userRepository.findById(userId).orElse(null)));
    }

    public UserDTO addNewUser(UserDTO userDTO) {
        final User newUser = new User(userDTO.username(), userDTO.password(), userDTO.email());
        userRepository.save(newUser);
        return UserDTO.of(newUser);
    }

    public UserDTO editUser(UserDTO userDTO) {
        User existingUser = userRepository.findById(userDTO.userId())
                .orElseThrow(() -> new IllegalArgumentException("User does not exist"));
        existingUser.setUsername(userDTO.username());
        existingUser.setPassword(userDTO.password());
        existingUser.setEmail(userDTO.email());
        userRepository.save(existingUser);
        return UserDTO.of(existingUser);
    }

    public void deleteUserById(long userId) {
        userRepository.deleteById(userId);
    }
}

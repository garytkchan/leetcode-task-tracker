package io.myproject.tasktracker.services;

import io.myproject.tasktracker.domain.User;
import io.myproject.tasktracker.exceptions.UsernameAlreadyExistsException;
import io.myproject.tasktracker.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;


import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private CustomUserDetailsService customUserDetailsService;

    @InjectMocks
    private UserService userService;

    @Test
    void saveUser() {

        User user = new User();
        user.setId(Integer.toUnsignedLong(2));
        user.setUsername("Carl");
        user.setPassword("mock password");
        Mockito.when(userRepository.save(user)).thenReturn(user);

        UsernameAlreadyExistsException usernameAlreadyExistsException = assertThrows(UsernameAlreadyExistsException.class,
                () -> userService.saveUser(user),
                                                                        "expected to throw");

        assertTrue(usernameAlreadyExistsException.getMessage().equals("Username '" + user.getUsername() + "' already exists"));

    }
}
package io.myproject.tasktracker.services;

import io.myproject.tasktracker.domain.Backlog;
import io.myproject.tasktracker.domain.Topic;
import io.myproject.tasktracker.domain.User;
import io.myproject.tasktracker.repositories.BacklogRepository;
import io.myproject.tasktracker.repositories.TopicRepository;
import io.myproject.tasktracker.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class TopicServiceTest {

    @Mock
    private TopicRepository topicRepository;

    @Mock
    private BacklogRepository backlogRepository;

    @Mock
    private UserRepository userRepository;

    @Test
    void saveOrUpdateTopic() {
        /*
        final String topicName = "Hello";
        final User user = new User(Integer.toUnsignedLong(2), "Gary");
        final Topic topic = new Topic(Integer.toUnsignedLong(1), topicName, "World", "test", user);
        List<Topic> list = new ArrayList<>();
        list.add(topic);


        Mockito.when(topicRepository.save(topic)).thenReturn(topic);
        Assert.notNull(topic, "topic is not null");
        Assert.state(topicName == topic.getTopicName(), "Topic Name Hello must be equal");
        */
    }

    @Test
    void findTopicByIdentifier() {
    }

    @Test
    void findAllTopics() {
    }

    @Test
    void deleteTopicByIdentifier() {
    }
}
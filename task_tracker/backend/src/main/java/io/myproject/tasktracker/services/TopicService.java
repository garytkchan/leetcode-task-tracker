package io.myproject.tasktracker.services;

import io.myproject.tasktracker.domain.Topic;
import io.myproject.tasktracker.exceptions.TopicIdException;
import io.myproject.tasktracker.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    // Save or update a Topic
    public Topic saveOrUpdateTopic(Topic topic) {

        try {
            topic.setTopicIdentifier(topic.getTopicIdentifier().toUpperCase());
            return topicRepository.save(topic);
        }
        catch (Exception e) {
            throw new TopicIdException("Topic ID: " + topic.getTopicIdentifier().toUpperCase() + " already exists");
        }
    }

    // locate a topic
    public Topic findTopicByIdentifier(String topicId) {

        Topic topic = topicRepository.findByTopicIdentifier(topicId.toUpperCase());
        if (topic == null) {
            throw new TopicIdException("Topic ID: " + topicId + " doesn't exist");
        }
        return topic;
    }

    // Get all topics
    public Iterable<Topic> findAllTopics() {
        return topicRepository.findAll();
    }

    // Delete
    public void deleteTopicByIdentifier(String topicId) {

        Topic topic = topicRepository.findByTopicIdentifier(topicId.toUpperCase());
        if (topic == null) {
            throw new TopicIdException("Delete fails. Topic ID: " + topicId + " doesn't exist");
        }
        topicRepository.delete(topic);
    }
}

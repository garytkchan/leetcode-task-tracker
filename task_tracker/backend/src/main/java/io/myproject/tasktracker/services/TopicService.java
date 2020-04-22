package io.myproject.tasktracker.services;

import io.myproject.tasktracker.domain.Backlog;
import io.myproject.tasktracker.domain.Topic;
import io.myproject.tasktracker.exceptions.TopicIdException;
import io.myproject.tasktracker.repositories.BacklogRepository;
import io.myproject.tasktracker.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    // Save or update a Topic(share with CREATE and UPDATE)
    public Topic saveOrUpdateTopic(Topic topic) {

        try {
            topic.setTopicIdentifier(topic.getTopicIdentifier().toUpperCase());

            // New Topic
            if (topic.getId() == null){

                // Create a new Backlog for the new topic
                Backlog backlog = new Backlog();
                topic.setBacklog(backlog);
                backlog.setTopic(topic);
                backlog.setTopicIdentifier(topic.getTopicIdentifier().toUpperCase());
            }

            // Updating a Topic. Get the topic's existing backlog with its idenifier from BacklogRepository
            if (topic.getId() != null) {
                topic.setBacklog(backlogRepository.findByTopicIdentifier(topic.getTopicIdentifier().toUpperCase()));
            }

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

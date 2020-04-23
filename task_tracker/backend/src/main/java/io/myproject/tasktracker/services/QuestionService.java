package io.myproject.tasktracker.services;

import io.myproject.tasktracker.domain.Backlog;
import io.myproject.tasktracker.domain.Question;
import io.myproject.tasktracker.domain.Topic;
import io.myproject.tasktracker.exceptions.TopicIdException;
import io.myproject.tasktracker.exceptions.TopicNotFoundException;
import io.myproject.tasktracker.repositories.BacklogRepository;
import io.myproject.tasktracker.repositories.QuestionRepository;
import io.myproject.tasktracker.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private TopicRepository topicRepository;

    public Question addQuestion(String topicIdentifier, Question question) {
        // topic sequence: topicIdentifier + questionID

        try {
            // Get its topic's backlog
            Backlog backlog = backlogRepository.findByTopicIdentifier(topicIdentifier);

            // set it with the new question
            question.setBacklog(backlog);

            // Get the current sequence at backlog
            Integer backlogSequence = backlog.getPTSequence();

            // assign the next available sequence number to this new question
            backlogSequence++;
            backlog.setPTSequence(backlogSequence);

            // add sequence to question. Form the new toic sequence
            question.setTopicSequence(topicIdentifier + "-" + backlogSequence);
            question.setTopicIdentifier(topicIdentifier);

            // initial priority
            if (question.getPriority() == null || question.getPriority() == 0){
                question.setPriority(3);  // 3: low priority
            }
            // initial status
            if (question.getStatus() == null || question.getStatus().equals("")){
                question.setStatus("TO_DO");
            }

            return questionRepository.save(question);

        }   catch(Exception e) {

                throw new TopicNotFoundException("This topic is not found");
        }
    }

    public Iterable<Question> findBacklogById(String id) {

        Topic topic = topicRepository.findByTopicIdentifier(id);

        // handle non-exist topic
        if (topic == null){
            throw new TopicNotFoundException("Topic with ID " + "'" +  id + "'" + " doesn't exist");
        }

        return questionRepository.findByTopicIdentifierOrderByPriority(id);
    }

    // find question by topic sequence: topicIdentifier/topicSequence. Both has to be valid
    public Question findPTByTopicSequence(String backlog_id, String q_id){

        // make sure we are searching on a valid backlog
        Backlog backlog = backlogRepository.findByTopicIdentifier(backlog_id);
        if (backlog == null) {
            throw new TopicNotFoundException("Topic with ID " + "'" +  backlog_id + "'" + " doesn't exist");
        }

        // make sure the question exists
        Question question = questionRepository.findByTopicSequence(q_id);
        if (question == null) {
            throw new TopicNotFoundException("Question with ID " + "'" + q_id + "'" + " not found" );
        }

        // question's identifier not equal to backlog_id
        if (!question.getTopicIdentifier().equals(backlog_id)){
            throw new TopicNotFoundException("Question with ID " + "'" + q_id + "'" + " doesn't exist in Topic '" + backlog_id + "'");
        }

        return question;
    }

    // Update a question
    public Question updateByTopicSequence(Question updatedQuestion, String backlog_id, String q_id) {

        Question question = findPTByTopicSequence(backlog_id, q_id);
        question = updatedQuestion;

        return questionRepository.save(question);
    }

    // Delete a question
    public void deleteQuestionByTopicSequence(String backlog_id, String q_id){
        Question question = findPTByTopicSequence(backlog_id, q_id);
        questionRepository.delete(question);
    }
}

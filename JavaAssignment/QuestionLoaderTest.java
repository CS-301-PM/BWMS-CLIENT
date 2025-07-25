package biblequiz;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.io.IOException;

class QuestionLoaderTest {
    @Test
    void testLoadRandomQuestions() {
        try {
            List<Question> questions = QuestionLoader.loadRandomQuestions(15);
            assertEquals(15, questions.size());
            assertNotNull(questions.get(0).getQuestion());
        } catch (IOException e) {
            fail("Failed to load questions: " + e.getMessage());
        }
    }
}
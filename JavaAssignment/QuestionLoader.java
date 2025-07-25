package biblequiz;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public final class QuestionLoader {
    private static final String JSON_PATH = "src/main/resources/questions.json";

    private QuestionLoader() {} // Prevent instantiation

    /**
     * Loads and randomizes questions from JSON. 
     * @throws IOException If file not found/unreadable.
     * @throws IllegalStateException If JSON is invalid or has insufficient questions.
     */
    public static List<Question> loadRandomQuestions(int count) throws IOException, IllegalStateException {
        Path path = Paths.get(JSON_PATH);
        validateFile(path);
        String jsonContent = Files.readString(path);
        List<Question> questions = parseJson(jsonContent);
        validateQuestions(questions, count);
        return randomizeQuestions(questions, count);
    }

    // --- Private helper methods (strictly for JSON/data tasks) ---
    private static void validateFile(Path path) throws IOException {
        if (!Files.exists(path)) {
            throw new IOException("JSON file not found at: " + path.toAbsolutePath());
        }
        if (Files.size(path) == 0) {
            throw new IOException("JSON file is empty.");
        }
    }

    private static List<Question> parseJson(String json) throws IllegalStateException {
        try {
            Gson gson = new Gson();
            return gson.fromJson(json, new TypeToken<List<Question>>(){}.getType());
        } catch (JsonSyntaxException e) {
            throw new IllegalStateException("Invalid JSON syntax: " + e.getMessage(), e);
        }
    }

    private static void validateQuestions(List<Question> questions, int required) throws IllegalStateException {
        if (questions == null) {
            throw new IllegalStateException("JSON parsing returned null.");
        }
        if (questions.size() < required) {
            throw new IllegalStateException(String.format(
                "JSON contains %d questions (minimum %d required).", 
                questions.size(), required
            ));
        }
    }

    private static List<Question> randomizeQuestions(List<Question> questions, int count) {
        Collections.shuffle(questions, new Random());
        return questions.subList(0, count);
    }
}
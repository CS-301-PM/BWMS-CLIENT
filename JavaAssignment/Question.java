package biblequiz;

/**
 * Represents a single Bible quiz question with options and answer.
 */
public class Question {
    private String question;
    private String option_a;
    private String option_b;
    private String option_c;
    private String option_d;
    private String answer;

    // Getters and Setters (required for Gson)
    public String getQuestion() { return question; }
    public String getOptionA() { return option_a; }
    public String getOptionB() { return option_b; }
    public String getOptionC() { return option_c; }
    public String getOptionD() { return option_d; }
    public String getAnswer() { return answer; }

    // Optional: Override toString() for debugging
    @Override
    public String toString() {
        return String.format("Q: %s\nA) %s\nB) %s\nC) %s\nD) %s\nAnswer: %s",
                question, option_a, option_b, option_c, option_d, answer);
    }
}
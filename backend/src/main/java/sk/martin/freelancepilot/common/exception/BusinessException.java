package sk.martin.freelancepilot.common.exception;

/**
 * Chyba porusujuca biznis pravidlo (napr. chybajuce pravidla pre danovy rok).
 * GlobalExceptionHandler ju mapuje na HTTP 409 s ProblemDetail telom.
 */
public class BusinessException extends RuntimeException {

    private final String errorCode;

    public BusinessException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
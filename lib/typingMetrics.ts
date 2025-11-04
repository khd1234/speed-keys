// Typing metrics calculation utilities

export interface TypingMetrics {
  wpm: number;
  accuracy: number;
  errorCount: number;
  correctChars: number;
  totalChars: number;
}

/**
 * Calculate Words Per Minute (WPM)
 * Standard: 1 word = 5 characters (including spaces)
 */
export function calculateWPM(correctChars: number, timeElapsedInSeconds: number): number {
  if (timeElapsedInSeconds === 0) return 0;

  const minutes = timeElapsedInSeconds / 60;
  const words = correctChars / 5; // Standard: 5 characters = 1 word
  const wpm = Math.round(words / minutes);

  return wpm >= 0 ? wpm : 0;
}

/**
 * Calculate accuracy percentage
 */
export function calculateAccuracy(correctChars: number, totalChars: number): number {
  if (totalChars === 0) return 100;

  const accuracy = (correctChars / totalChars) * 100;
  return Math.round(accuracy * 10) / 10; // Round to 1 decimal place
}

/**
 * Compare user input with target text character by character
 * Returns an array indicating correctness of each character
 */
export function compareTexts(targetText: string, userInput: string): Array<"correct" | "incorrect" | "untyped"> {
  const result: Array<"correct" | "incorrect" | "untyped"> = [];

  for (let i = 0; i < targetText.length; i++) {
    if (i >= userInput.length) {
      result.push("untyped");
    } else if (targetText[i] === userInput[i]) {
      result.push("correct");
    } else {
      result.push("incorrect");
    }
  }

  return result;
}

/**
 * Calculate comprehensive typing metrics
 */
export function getTypingMetrics(targetText: string, userInput: string, timeElapsedInSeconds: number): TypingMetrics {
  const comparison = compareTexts(targetText, userInput);

  const correctChars = comparison.filter((status) => status === "correct").length;
  const incorrectChars = comparison.filter((status) => status === "incorrect").length;
  const totalChars = userInput.length;

  const wpm = calculateWPM(correctChars, timeElapsedInSeconds);
  const accuracy = calculateAccuracy(correctChars, totalChars);

  return {
    wpm,
    accuracy,
    errorCount: incorrectChars,
    correctChars,
    totalChars,
  };
}

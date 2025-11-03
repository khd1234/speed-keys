// Type definitions for the typing speed test application

export interface TypingStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errors: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
}

export interface TestResult extends TypingStats {
  timestamp: number;
  duration: number;
}

export type TestDuration = 15 | 30 | 60 | 120;

export type TestState = 'idle' | 'running' | 'completed';

export interface CharacterStatus {
  char: string;
  status: 'untouched' | 'correct' | 'incorrect';
}

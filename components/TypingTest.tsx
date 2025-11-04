"use client";

import { useState, useEffect, useRef } from "react";
import { generateText } from "@/lib/textGenerator";
import { getTypingMetrics, compareTexts } from "@/lib/typingMetrics";

type TestDuration = 30 | 60 | 90;

interface MetricVisibility {
  wpm: boolean;
  accuracy: boolean;
  errors: boolean;
  time: boolean;
}

export default function TypingTest() {
  // Test configuration
  const [testDuration, setTestDuration] = useState<TestDuration>(60);
  const [targetText, setTargetText] = useState("");

  // Test state
  const [userInput, setUserInput] = useState("");
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(testDuration);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Metrics
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errorCount, setErrorCount] = useState(0);

  // Metric visibility
  const [metricVisibility, setMetricVisibility] = useState<MetricVisibility>({
    wpm: true,
    accuracy: true,
    errors: true,
    time: true,
  });

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const metricsUpdateRef = useRef<NodeJS.Timeout | null>(null);

  // Load visibility preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("metricVisibility");
    if (saved) {
      try {
        setMetricVisibility(JSON.parse(saved));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save visibility preferences to localStorage
  useEffect(() => {
    localStorage.setItem("metricVisibility", JSON.stringify(metricVisibility));
  }, [metricVisibility]);

  const toggleMetricVisibility = (metric: keyof MetricVisibility) => {
    setMetricVisibility((prev) => ({
      ...prev,
      [metric]: !prev[metric],
    }));
  };

  // Initialize test with random text on mount
  useEffect(() => {
    const text = generateText("words", 100);
    setTargetText(text);
  }, []);

  // Timer logic
  useEffect(() => {
    if (isTestActive && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTestActive(false);
            setIsTestComplete(true);
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            if (metricsUpdateRef.current) {
              clearInterval(metricsUpdateRef.current);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTestActive, timeRemaining]);

  // Continuous metrics update while test is active
  useEffect(() => {
    if (isTestActive && startTime) {
      metricsUpdateRef.current = setInterval(() => {
        const timeElapsed = (Date.now() - startTime) / 1000;
        if (userInput.length > 0) {
          const metrics = getTypingMetrics(targetText, userInput, timeElapsed);
          setWpm(metrics.wpm);
          setAccuracy(metrics.accuracy);
          setErrorCount(metrics.errorCount);
        }
      }, 100); // Update every 100ms for smooth updates
    }

    return () => {
      if (metricsUpdateRef.current) {
        clearInterval(metricsUpdateRef.current);
      }
    };
  }, [isTestActive, startTime, userInput, targetText]);

  // Check if test is complete
  useEffect(() => {
    if (isTestActive && userInput.length >= targetText.length) {
      const comparison = compareTexts(targetText, userInput);
      const allCorrect = comparison.every((status) => status === "correct");

      if (allCorrect) {
        setIsTestActive(false);
        setIsTestComplete(true);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        if (metricsUpdateRef.current) {
          clearInterval(metricsUpdateRef.current);
        }
      }
    }
  }, [userInput, targetText, isTestActive]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isTestComplete) return;

    // Prevent copy-paste functionality
    if (e.ctrlKey || e.metaKey) {
      if (e.key === "c" || e.key === "v" || e.key === "x" || e.key === "a") {
        e.preventDefault();
        return;
      }
    }

    // Handle backspace
    if (e.key === "Backspace") {
      e.preventDefault();
      setUserInput((prev) => prev.slice(0, -1));
      return;
    }

    // Handle regular characters
    if (e.key.length === 1 && userInput.length < targetText.length) {
      e.preventDefault();

      // Start test on first character
      if (!isTestActive && userInput.length === 0) {
        setIsTestActive(true);
        setStartTime(Date.now());
      }

      setUserInput((prev) => prev + e.key);
    }
  };

  const restartTest = () => {
    const text = generateText("words", 100);
    setTargetText(text);
    setUserInput("");
    setIsTestActive(false);
    setIsTestComplete(false);
    setTimeRemaining(testDuration);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setErrorCount(0);

    setTimeout(() => {
      containerRef.current?.focus();
    }, 100);
  };

  const handleDurationChange = (duration: TestDuration) => {
    setTestDuration(duration);
    setTimeRemaining(duration);
  };

  // Render character-by-character comparison
  const renderText = () => {
    const comparison = compareTexts(targetText, userInput);
    const cursorPosition = userInput.length;

    return (
      <div className="text-2xl leading-relaxed font-mono whitespace-pre-wrap">
        {targetText.split("").map((char, index) => {
          let className = "text-gray-500";

          if (index < userInput.length) {
            className = comparison[index] === "correct" ? "text-green-400" : "text-red-400 bg-red-900/30";
          }

          // Add cursor
          if (index === cursorPosition && !isTestComplete) {
            className += " border-l-2 border-blue-500 animate-pulse";
          }

          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Speed Keys</h1>
          <p className="text-gray-400">Test your typing speed and accuracy</p>
        </div>  

        {/* Duration Selector */}
        {!isTestActive && !isTestComplete && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-4 mb-6">
            <div className="flex items-center justify-center gap-4">
              <span className="text-gray-300 font-medium">Test Duration:</span>
              {[30, 60, 90].map((duration) => (
                <button
                  key={duration}
                  onClick={() => handleDurationChange(duration as TestDuration)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    testDuration === duration ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {duration}s
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Show hidden metrics button */}
        {(!metricVisibility.wpm || !metricVisibility.accuracy || !metricVisibility.errors || !metricVisibility.time) && (
          <div className="mb-6 flex justify-center">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-3">
              <span className="text-gray-400 text-sm mr-3">Show:</span>
              {!metricVisibility.wpm && (
                <button
                  onClick={() => toggleMetricVisibility("wpm")}
                  className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded hover:bg-blue-900/50 transition-colors text-sm mr-2"
                >
                  WPM
                </button>
              )}
              {!metricVisibility.accuracy && (
                <button
                  onClick={() => toggleMetricVisibility("accuracy")}
                  className="px-3 py-1 bg-green-900/30 text-green-400 rounded hover:bg-green-900/50 transition-colors text-sm mr-2"
                >
                  Accuracy
                </button>
              )}
              {!metricVisibility.errors && (
                <button
                  onClick={() => toggleMetricVisibility("errors")}
                  className="px-3 py-1 bg-red-900/30 text-red-400 rounded hover:bg-red-900/50 transition-colors text-sm mr-2"
                >
                  Errors
                </button>
              )}
              {!metricVisibility.time && (
                <button
                  onClick={() => toggleMetricVisibility("time")}
                  className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded hover:bg-purple-900/50 transition-colors text-sm"
                >
                  Time
                </button>
              )}
            </div>
          </div>
        )}

        {/* Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {metricVisibility.wpm && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-4 text-center relative group">
              <button
                onClick={() => toggleMetricVisibility("wpm")}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Hide WPM"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-3xl font-bold text-blue-400">{wpm}</div>
              <div className="text-sm text-gray-400">WPM</div>
            </div>
          )}

          {metricVisibility.accuracy && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-4 text-center relative group">
              <button
                onClick={() => toggleMetricVisibility("accuracy")}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Hide Accuracy"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-3xl font-bold text-green-400">{accuracy}%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
          )}

          {metricVisibility.errors && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-4 text-center relative group">
              <button
                onClick={() => toggleMetricVisibility("errors")}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Hide Errors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-3xl font-bold text-red-400">{errorCount}</div>
              <div className="text-sm text-gray-400">Errors</div>
            </div>
          )}

          {metricVisibility.time && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 p-4 text-center relative group">
              <button
                onClick={() => toggleMetricVisibility("time")}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Hide Time"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-3xl font-bold text-purple-400">{timeRemaining}s</div>
              <div className="text-sm text-gray-400">Time Left</div>
            </div>
          )}
        </div>

        {/* Typing Area */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700 p-8 mb-6">
          {!isTestComplete ? (
            <>
              {/* Display Text - Click and type here */}
              <div
                ref={containerRef}
                tabIndex={0}
                onKeyDown={handleKeyPress}
                className="mb-6 p-8 bg-gray-900/50 rounded-lg min-h-[300px] relative outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
              >
                {targetText ? renderText() : <div className="text-gray-500 text-xl">Loading text...</div>}
              </div>

              {/* Instructions */}
              <div className="text-center text-gray-400 text-sm space-y-2">
                <p className="text-lg font-medium text-gray-300">
                  {isTestActive ? "⌨️ Keep typing..." : "👆 Click the text above and start typing to begin!"}
                </p>
                <p className="text-gray-500">Copy and paste is disabled • Press Backspace to correct mistakes</p>
              </div>
            </>
          ) : (
            /* Results Screen */
            <div className="text-center py-8">
              <h2 className="text-4xl font-bold text-white mb-8">Test Complete! 🎉</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
                  <div className="text-5xl font-bold text-blue-400 mb-2">{wpm}</div>
                  <div className="text-gray-300">Words Per Minute</div>
                </div>

                <div className="bg-green-900/30 border border-green-700 rounded-lg p-6">
                  <div className="text-5xl font-bold text-green-400 mb-2">{accuracy}%</div>
                  <div className="text-gray-300">Accuracy</div>
                </div>

                <div className="bg-red-900/30 border border-red-700 rounded-lg p-6">
                  <div className="text-5xl font-bold text-red-400 mb-2">{errorCount}</div>
                  <div className="text-gray-300">Total Errors</div>
                </div>

                <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-6">
                  <div className="text-5xl font-bold text-purple-400 mb-2">{userInput.length}</div>
                  <div className="text-gray-300">Characters Typed</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Restart Button */}
        <div className="text-center">
          <button
            onClick={restartTest}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
          >
            {isTestComplete ? "🔄 Try Again" : "🔄 Restart Test"}
          </button>
        </div>
      </div>
    </div>
  );
}

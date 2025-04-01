import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Transition function to update mode and history
  function transition(newMode, replace = false) {
    setHistory((prev) => {
      if (replace) {
        const newHistory = [...prev];
        newHistory.pop(); // Remove the last mode
        newHistory.push(newMode); // Add the new mode
        return newHistory;
      }
      return [...prev, newMode]; // Add the new mode to history
    });
    setMode(newMode); // Update the mode
  }

  // Back function to go back in the history
  function back() {
    if (history.length > 1) {  // Ensure we don’t go back past the initial mode
      setHistory((prev) => prev.slice(0, -1)); // Remove the last mode from history
      setMode(history[history.length - 2]); // Set the mode to the previous one in history
    }
  }

  return { mode: history[history.length - 1], transition, back };
}
import { useEffect, useRef, useState } from 'react';

const STEP = 0.1;
const TIMEOUT_STEP_LINEAR = 500;
const TIMEOUT_STEP_RANDOM = 2000;
const TIMEOUT_CLEAR = 500;

export const useProgress = (): number => {
  const state = useRef({
    isRandomCycle: false,
  }).current;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (progress < 1) {
      const addValue = state.isRandomCycle ? (Math.random() * (0.4 - 0.1) + 0.1) : STEP;
      const interval = setInterval(() => setProgress((progress + addValue) > 1 ? 1 : progress + addValue),
        state.isRandomCycle ? TIMEOUT_STEP_RANDOM : TIMEOUT_STEP_LINEAR);
      return () => clearInterval(interval);
    } else {
      setTimeout(() => setProgress(0), TIMEOUT_CLEAR);
      state.isRandomCycle = !state.isRandomCycle;
    }
  }, [progress, setProgress]);
  return progress;
};

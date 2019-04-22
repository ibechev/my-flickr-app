import { useState, useEffect } from "react";

export const useLoadingDots = () => {
  const [dots, setDots] = useState([null]);

  useEffect(() => {
    const intervalId = setInterval(() => addDot(), 1000);
    return function cleanup() {
      clearInterval(intervalId);
    };
  });

  function addDot() {
    if (dots.length === 5) {
      setDots([]);
    } else {
      setDots([...dots, null]);
    }
  }

  return dots;
};

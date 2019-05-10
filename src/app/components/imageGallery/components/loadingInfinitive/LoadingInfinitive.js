import React from "react";
import { useLoadingDots } from "../../../../utils/hooks";

const LoadingInfinitive = () => {
  const dots = useLoadingDots();
  return (
    <div className="loading-infinitive">
      <i className="fas fa-spinner fa-spin" />
      <span className="title">Loading</span>
      <span>
        {dots.map((dot, i) => (
          <span key={i}>.</span>
        ))}
        {dots}
      </span>
    </div>
  );
};

export default LoadingInfinitive;

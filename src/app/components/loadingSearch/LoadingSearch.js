import React from "react";
import { useLoadingDots } from "../../utilities";

const LoadingSearch = () => {
  const dots = useLoadingDots();
  return (
    <div className="loading-search">
      <i className="fas fa-spinner fa-spin" />
      <span className="title">Searching</span>
      <span>
        {dots.map((dot, i) => (
          <span key={i}>.</span>
        ))}
        {dots}
      </span>
    </div>
  );
};

export default LoadingSearch;

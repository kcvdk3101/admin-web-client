import React from "react";

interface Props {}

const LoadingProgress = (props: Props) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  opacity-75 flex flex-col items-center justify-center">
      <div className="loader animate-spinner border-gray-200 rounded-full border-4 border-t-4 h-12 w-12 mb-4"></div>
      <h2 className="text-centertext-xl font-semibold">Loading...</h2>
      <p className="w-1/3 text-center">
        This take a few seconds, please don't close this page.
      </p>
    </div>
  );
};

export default LoadingProgress;

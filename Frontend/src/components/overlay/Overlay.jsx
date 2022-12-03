import React from "react";

const OVerlay = ({ children }) => {
  return (
    <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700  flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default OVerlay;

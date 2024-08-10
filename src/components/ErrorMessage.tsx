import React from "react";

const ErrorMessage: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="w-full bg-darkgray p-6 rounded-md flex justify-center items-center h-full border-2 border-gray-700">
      <span className="mt-2 font-bold text-gray-300">
        Error: Failed to fetch {name} 😵
      </span>
    </div>
  );
};

export default ErrorMessage;

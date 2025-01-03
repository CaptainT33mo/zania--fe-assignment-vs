import React from "react";

interface StatusIndicatorProps {
  status: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  return (
    <div className="flex items-center">
      {status.toLowerCase() === "available" && (
        <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
      )}
      <span className="capitalize">{status}</span>
    </div>
  );
};

export default StatusIndicator;

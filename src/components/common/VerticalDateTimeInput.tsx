import React from "react";

interface VerticalDateTimeInputProps {
  label: string;
}

const VerticalDateTimeInput: React.FC<VerticalDateTimeInputProps> = ({
  label,
}) => {
  return (
    <div className="flex flex-col flex-1 mb-4 mx-2">
      <label htmlFor="date" className="mb-2 text-base text-gray-900">
        {label}
      </label>
      <input
        type="date"
        id="date"
        name="date"
        placeholder="date"
        className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
      />
    </div>
  );
};

export default VerticalDateTimeInput;

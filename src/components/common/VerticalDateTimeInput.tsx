import React from "react";

interface VerticalDateTimeInputProps {
  cols: number;
  label: string;
}

const VerticalDateTimeInput: React.FC<VerticalDateTimeInputProps> = ({
  cols,
  label,
}) => {
  return (
    <div className={`col-span-${cols}`}>
      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="date"
        id="date"
        name="date"
        placeholder="date"
        className="mt-2 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"
      />
    </div>
  );
};

export default VerticalDateTimeInput;

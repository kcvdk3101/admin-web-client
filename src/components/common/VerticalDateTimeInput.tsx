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
      <label
        htmlFor="date"
        className="block text-sm sm:text-base font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type="date"
        id="date"
        name="date"
        placeholder="date"
        className="mt-2 p-3 w-full shadow-sm text-sm sm:text-base border border-gray-500 rounded-md"
      />
    </div>
  );
};

export default VerticalDateTimeInput;

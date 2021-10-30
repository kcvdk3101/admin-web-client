import React from "react";

interface VerticalTextareaInputProps {
  cols: number;
  label: string;
  inputName: string;
  register: any;
  errors: any;
}

const VerticalTextareaInput: React.FC<VerticalTextareaInputProps> = ({
  cols,
  label,
  inputName,
  register,
  errors,
}) => {
  return (
    <div className={`col-span-${cols}`}>
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor={inputName}
      >
        {label}
      </label>
      <textarea
        id={inputName}
        className="mt-2 p-3 block w-full shadow-lg sm:text-sm border border-red-500 focus:border-blue-500 focus:ring-blue-500"
        rows={4}
        cols={50}
        {...register(`${inputName}`)}
      />
    </div>
  );
};

export default VerticalTextareaInput;

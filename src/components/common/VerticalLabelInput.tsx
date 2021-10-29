import React from "react";

interface VerticalLabelInputProps {
  cols: number;
  label: string;
  inputName: string;
  register: any;
  errors: any;
}

const VerticalLabelInput: React.FC<VerticalLabelInputProps> = ({
  cols,
  label,
  inputName,
  register,
  errors,
}) => {
  return (
    <div className={`col-span-${cols}`}>
      <label
        htmlFor={inputName}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={inputName}
        className="mt-2 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"
        type="text"
        {...register(`${inputName}`)}
      />
      {errors?.[inputName] && (
        <p className="text-red-500">This field is required</p>
      )}
    </div>
  );
};

export default VerticalLabelInput;

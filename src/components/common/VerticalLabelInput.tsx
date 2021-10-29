import React from "react";

interface VerticalLabelInputProps {
  cols: number;
  label: string;
  inputName: string;
  type: string;
  register: any;
  errors: any;
}

const VerticalLabelInput: React.FC<VerticalLabelInputProps> = ({
  cols,
  label,
  inputName,
  type,
  register,
  errors,
}) => {
  return (
    <div className={`col-span-${cols} animate-fade-in-down`}>
      <label
        htmlFor={inputName}
        className="block text-sm sm:text-base font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={inputName}
        className="mt-2 p-2 block w-full shadow-sm text-sm sm:text-base border border-gray-500 rounded-md animate-fade-in-down"
        type={type}
        {...register(`${inputName}`)}
      />
      {errors?.[inputName] && (
        <p className="text-red-500">{errors?.[inputName].message}</p>
      )}
    </div>
  );
};

export default VerticalLabelInput;

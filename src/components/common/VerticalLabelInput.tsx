import React from "react";

interface VerticalLabelInputProps {
  label: string;
  inputName: string;
  register: any;
  errors: any;
}

const VerticalLabelInput: React.FC<VerticalLabelInputProps> = ({
  label,
  inputName,
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col flex-1 mb-4">
      <label htmlFor={inputName} className="mb-2 text-base text-gray-900">
        {label}
      </label>
      <input
        id={inputName}
        className="border py-2 px-3 text-grey-800 outline-none"
        {...register(`${inputName}`)}
      />
      {errors.name && <p className="text-red-500">This field is required</p>}
    </div>
  );
};

export default VerticalLabelInput;

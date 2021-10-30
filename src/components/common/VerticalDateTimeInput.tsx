import React from "react";
import { Utilities } from "../../helpers/utils";

interface VerticalDateTimeInputProps {
  cols: number;
  label: string;
  inputName: string;
  register: any;
  errors: any;
  handleChangeCouponAttribute?: (e: any) => void;
}

const VerticalDateTimeInput: React.FC<VerticalDateTimeInputProps> = ({
  cols,
  label,
  inputName,
  register,
  errors,
  handleChangeCouponAttribute,
}) => {
  return (
    <div className={`col-span-${cols}`}>
      <label
        htmlFor={inputName}
        className="block text-sm sm:text-base font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type="datetime-local"
        id={inputName}
        name={inputName}
        className="mt-2 p-3 w-full shadow-sm text-sm sm:text-base border border-gray-500 rounded-md"
        {...register(`${inputName}`)}
      />
      {errors?.[inputName] && (
        <p className="text-red-500">{errors?.[inputName].message}</p>
      )}
    </div>
  );
};

export default VerticalDateTimeInput;

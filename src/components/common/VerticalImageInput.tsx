import React from "react";

interface VerticalImageInputProps {
  cols: number;
  image: File | undefined;
  label: string;
  widthImage: string;
  inputName: string;
  type: string;
  register: any;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VerticalImageInput: React.FC<VerticalImageInputProps> = ({
  cols,
  image,
  label,
  widthImage,
  inputName,
  type,
  register,
  onChangeImage,
}) => {
  return (
    <div className={`col-span-${cols}`}>
      <input
        id={inputName}
        className="hidden"
        accept="image/*"
        type={type}
        {...register(`${inputName}`)}
        onChange={onChangeImage}
      />
      {image ? (
        <label htmlFor={inputName} className="cursor-pointer">
          {label}
          <img
            src={URL.createObjectURL(image)}
            alt="Image"
            className={`shadow-md mt-2 w-${widthImage}`}
          />
        </label>
      ) : (
        <label
          htmlFor={inputName}
          className=" flex flex-col items-center w-1/6 hover:bg-blue-400 hover:text-white rounded p-2 transition duration-75 dark:hover:bg-green-400 text-sm sm:text-base cursor-pointer"
        >
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          {label}
        </label>
      )}
    </div>
  );
};

export default VerticalImageInput;

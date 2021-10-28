import React from "react";

interface VerticalImageInputProps {
  widthImage: string;
  image: File | undefined;
  label: string;
  inputName: string;
  register: any;
  errors: any;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VerticalImageInput: React.FC<VerticalImageInputProps> = ({
  widthImage,
  image,
  label,
  inputName,
  register,
  errors,
  onChangeImage,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <input
        accept="image/*"
        id={inputName}
        type="file"
        style={{ display: "none" }}
        {...register(`${inputName}`)}
        onChange={onChangeImage}
      />
      {image ? (
        <label htmlFor={inputName} className={`cursor-pointer w-${widthImage}`}>
          {label}
          <img
            src={URL.createObjectURL(image)}
            alt="Image"
            className="w-full shadow-md mt-2"
          />
        </label>
      ) : (
        <label
          htmlFor={inputName}
          className=" flex flex-col items-center w-1/6 hover:bg-blue-400 hover:text-white rounded p-2 transition duration-75 dark:hover:bg-green-400 text-base cursor-pointer"
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

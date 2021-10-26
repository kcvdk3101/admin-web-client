import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "../../app/hooks";
import { addParentCategory } from "../../features/categories/categoriesSlice";

type FormValues = {
  name: string;
  files: File | FileList;
};

const ParentCategoryFormSchema = yup
  .object({
    name: yup.string().required(),
    files: yup.mixed().required("This field is required"),
  })
  .required();

export interface ParentCategoryProps {
  handleParentCategoryForm: () => void;
}

const ParentCategory: React.FC<ParentCategoryProps> = ({
  handleParentCategoryForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(ParentCategoryFormSchema),
  });
  const dispatch = useAppDispatch();

  const [image, setImage] = useState<File>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("files", image as Blob);

    try {
      dispatch(addParentCategory(formData));
      handleParentCategoryForm();
      toast.success("Succeed");
    } catch (error) {
      throw error;
    }
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }
    setImage(e.target.files[0]);
  };

  return (
    <div className="relative my-6 mx-auto max-w-3xl w-1/2">
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-gray-200">
        <h3 className="text-xl md:text-2xl font-bold p-5">Add new category</h3>
        <div className="border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none dark:bg-gray-200">
          <form
            className="relative p-6 flex-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="mb-2 text-base text-gray-900">
                Name
              </label>
              <input
                id="name"
                className="border py-2 px-3 text-grey-800 outline-none"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <input
                accept="image/*"
                id="files"
                type="file"
                style={{ display: "none" }}
                {...register("files")}
                onChange={onChangeImage}
              />
              {image ? (
                <label htmlFor="files" className="cursor-pointer  w-1/6">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Image"
                    className="h-32 w-32 shadow-md"
                  />
                </label>
              ) : (
                <label
                  htmlFor="files"
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
                  Choose image
                </label>
              )}
            </div>

            <div className="flex items-center justify-end p-6">
              <button
                className="bg-transparent text-gray-500 font-bold uppercase text-xs px-3 py-2 hover:shadow-md outline-none ease-linear transition-all duration-150 dark:bg-gray-50"
                type="button"
                onClick={handleParentCategoryForm}
              >
                Close
              </button>
              <button
                className="bg-blue-500 font-bold uppercase text-sm px-4 py-2 ml-2 rounded shadow hover:shadow-md outline-none ease-linear transition-all duration-150 text-white dark:bg-white dark:text-green-500 dark:hover:text-green-600"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ParentCategory;

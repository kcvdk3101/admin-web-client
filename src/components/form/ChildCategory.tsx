import { yupResolver } from "@hookform/resolvers/yup";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import axiosClient from "../../api/axiosClient";
import { useAppDispatch } from "../../app/hooks";
import { addChildCategory } from "../../features/categories/categoriesSlice";
import { Configs } from "../../helpers/configs";

type FormValues = {
  name: string;
  file: File | FileList;
};

type ParentNameProps = {
  name: string;
  depth: number;
};

export interface ChildCategoryProps {
  handleChildCategoryForm: () => void;
}

const ChildCategoryFormSchema = yup
  .object({
    name: yup.string().required(),
    file: yup.mixed().required("This field is required"),
  })
  .required();

const ChildCategory: React.FC<ChildCategoryProps> = ({
  handleChildCategoryForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(ChildCategoryFormSchema),
  });
  const dispatch = useAppDispatch();

  const [imageChild, setImageChild] = useState<File>();
  const [arrayParentName, setArrayParentName] = useState<ParentNameProps[]>([]);
  const [parentName, setParentName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setParentName(event.target.value);
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await axiosClient.get<any, []>(
          `${Configs.API_BASE_URL}/categories/name`
        );
        setArrayParentName(response);
      } catch (error) {}
    })();
  }, [arrayParentName]);

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImageChild(undefined);
      return;
    }
    setImageChild(e.target.files[0]);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("parentName", parentName);
    formData.append("files", imageChild as Blob);
    try {
      dispatch(addChildCategory(formData));
      handleChildCategoryForm();
      toast.success("Succeed");
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="relative my-6 mx-auto max-w-3xl w-1/2">
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <h3 className="text-xl md:text-2xl font-semibold p-5">
          Add child category
        </h3>
        <div className="border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
          <form
            className="relative p-6 flex-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col w-full mr-2">
                <label
                  htmlFor="parentName"
                  className="mb-2 text-base text-gray-900"
                >
                  Parent name
                </label>
                <select
                  className="border py-3 px-1 text-grey-800 outline-none rounded"
                  onChange={handleChange}
                >
                  <option value="">Please choose parent name</option>
                  {arrayParentName.map((parent, index) => (
                    <option key={index} value={parent.name}>
                      {parent.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="mb-2 text-base text-gray-900">
                  Name
                </label>
                <input
                  id="name"
                  className="border p-3 text-grey-800 outline-none rounded"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500">This field is required</p>
                )}
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <input
                accept="image/*"
                id="file"
                type="file"
                style={{ display: "none" }}
                {...register("file")}
                onChange={onChangeImage}
              />
              {imageChild ? (
                <label htmlFor="file" className="cursor-pointer w-1/6">
                  <img
                    src={URL.createObjectURL(imageChild)}
                    alt="Image"
                    className="h-32 w-32 shadow-md"
                  />
                </label>
              ) : (
                <label
                  htmlFor="file"
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
                onClick={handleChildCategoryForm}
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

export default ChildCategory;

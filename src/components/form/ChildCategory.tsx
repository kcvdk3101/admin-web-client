import { yupResolver } from "@hookform/resolvers/yup";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import axiosClient from "../../api/axiosClient";
import { useAppDispatch } from "../../app/hooks";
import { addChildCategory } from "../../features/categories/categoriesSlice";
import { API_BASE_URL } from "../../helpers/configs";
// import { Configs } from "../../helpers/configs";
import ButtonsAction from "../common/ButtonsAction";
import VerticalImageInput from "../common/VerticalImageInput";
import VerticalLabelInput from "../common/VerticalLabelInput";

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
          `${API_BASE_URL}/categories/name`
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
            className="grid grid-cols-6 gap-6 p-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-span-3">
              <label
                htmlFor="parentName"
                className="block text-sm sm:text-base font-medium text-gray-700"
              >
                Parent name
              </label>
              <select
                className="mt-2 py-2.5 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md"
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

            <VerticalLabelInput
              cols={3}
              label="Name"
              inputName="name"
              type="text"
              register={register}
              errors={errors}
            />

            <VerticalImageInput
              cols={6}
              image={imageChild}
              label="Choose image"
              widthImage="1/2"
              inputName="file"
              type="file"
              register={register}
              onChangeImage={onChangeImage}
            />

            <ButtonsAction
              cols={6}
              title="Add"
              handleAction={handleChildCategoryForm}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChildCategory;

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import ButtonsAction from "../common/ButtonsAction";
import VerticalDateTimeInput from "../common/VerticalDateTimeInput";
import VerticalImageInput from "../common/VerticalImageInput";
import VerticalLabelInput from "../common/VerticalLabelInput";

type FormValues = {
  couponName: string;
  couponType: string;
  isUnlimited: boolean;
  modifier: number;
  amount: number;
  unit: string;
  usage: number;
  limit: number;
  pointAchieve: number;
  startTime: Date | string;
  endTime: Date | string;
  files: File | FileList;
};

export interface NewCouponProps {
  openCouponForm: boolean;
  handleOpenCouponForm: () => void;
}

const NewCouponFormSchema = yup
  .object({
    couponName: yup.string().required(),
    description: yup
      .string()
      .min(1, "Please enter more than 1 character")
      .required("This field is required"),
    files: yup.mixed().required("This field is required"),
  })
  .required();

const NewCoupon: React.FC<NewCouponProps> = ({
  openCouponForm,
  handleOpenCouponForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(NewCouponFormSchema),
  });

  const [image, setImage] = useState<File>();

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }
    setImage(e.target.files[0]);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    //  const formData = new FormData();
    //  formData.append("name", data.name);
    //  formData.append("files", image as Blob);
    //  try {
    //    dispatch(addParentCategory(formData));
    //    handleParentCategoryForm();
    //    toast.success("Succeed");
    //  } catch (error) {
    //    throw error;
    //  }
  };

  return (
    <div
      className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center ${
        openCouponForm
          ? "backdrop-filter backdrop-blur-sm flex animate-fade-in-down"
          : "hidden"
      }`}
    >
      <div className="relative my-6 mx-auto max-w-3xl w-1/2">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <h3 className="text-xl md:text-2xl font-semibold p-5">Coupon Form</h3>
          <div className="border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
            <form
              className="relative p-6 flex-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex">
                <VerticalLabelInput
                  label="Name"
                  inputName="couponName"
                  register={register}
                  errors={errors}
                />
                <div className="flex-1 flex flex-col">
                  <label
                    className="ml-2 mb-2 text-base text-gray-900"
                    htmlFor="couponType"
                  >
                    Type of coupon
                  </label>
                  <select
                    className="border py-2 px-3 text-grey-800 outline-none ml-2"
                    name="couponType"
                    id="couponType"
                  >
                    {["Percetage", "Cash"].map((t, index) => (
                      <option className="capitalize" key={index} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex">
                <div>
                  <button>Unlimited</button>
                  <button>Limited</button>
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label
                  className={` mb-2 text-base text-gray-900`}
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="border py-2 px-3 text-grey-800 outline-none"
                  rows={4}
                  cols={50}
                  name="description"
                  id="description"
                />
              </div>

              <div className="flex">
                <VerticalDateTimeInput label="Start event" />
                <VerticalDateTimeInput label="End event" />
              </div>

              <VerticalImageInput
                widthImage="1/3"
                image={image}
                label="Choose image"
                inputName="files"
                register={register}
                errors={errors}
                onChangeImage={onChangeImage}
              />

              <ButtonsAction
                title="Create"
                handleAction={handleOpenCouponForm}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCoupon;

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
    limit: yup.number().positive().required(),
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
  const [isUnlimited, setIsUnlimited] = useState(true);
  const [couponType, setCouponType] = useState<string>("Percentage");

  const handleChangeUnlimited = () => {
    setIsUnlimited(!isUnlimited);
  };

  const handleCouponType = (e: any) => {
    setCouponType(e.target.value);
  };

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

  console.log(couponType);

  return (
    <div
      className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center ${
        openCouponForm
          ? "backdrop-filter backdrop-blur-sm flex animate-fade-in-down"
          : "hidden"
      }`}
    >
      <div className="relative mt-60  mx-auto max-w-3xl w-1/2">
        <div className="border-0 rounded-lg shadow-lg flex flex-col bg-white outline-none focus:outline-none">
          <h3 className="text-xl md:text-2xl font-semibold pl-5 pt-5">
            Coupon Form
          </h3>
          <form className="grid grid-cols-6 gap-6 p-6">
            <VerticalLabelInput
              cols={6}
              label="Coupon Name"
              inputName="couponName"
              register={register}
              errors={errors}
            />

            <div className="col-span-3">
              <p className="block text-sm sm:text-base font-medium text-gray-700 mb-4">
                Limit of coupon
              </p>
              <button
                className={`${
                  isUnlimited
                    ? "bg-blue-400 text-white"
                    : "bg-white text-blue-400"
                } py-2 px-3 rounded transition duration-150`}
                type="button"
                onClick={handleChangeUnlimited}
              >
                Unlimited
              </button>
              <button
                className={`${
                  !isUnlimited
                    ? "bg-blue-400 text-white"
                    : "bg-white text-blue-400"
                } py-2 px-3 rounded transition duration-150 ml-2`}
                type="button"
                onClick={handleChangeUnlimited}
              >
                Limited
              </button>
            </div>

            <div className="col-span-3">
              <label
                htmlFor="limit"
                className={
                  !isUnlimited
                    ? "animate-fade-in-opacity block text-sm sm:text-base font-medium text-gray-700"
                    : "hidden"
                }
              >
                Total number of coupons
              </label>
              <input
                type="number"
                name="limit"
                id="limit"
                className={`${
                  !isUnlimited ? "animate-fade-in-opacity" : "hidden"
                } mt-2 p-3 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md`}
              />
            </div>

            <div className="col-span-6">
              <label
                className="block text-sm sm:text-base font-medium text-gray-700"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="mt-2 p-3 block w-full text-sm sm:text-base border border-gray-500 rounded-md"
                rows={4}
                cols={50}
                name="description"
                id="description"
              />
            </div>

            <VerticalDateTimeInput cols={3} label="Start event" />
            <VerticalDateTimeInput cols={3} label="End event" />

            <hr className="col-span-6" />
            <p className="col-span-6 text-lg md:text-xl font-semibold ">
              Coupon Details
            </p>

            <div className="col-span-3">
              <label
                htmlFor="couponType"
                className="block text-sm font-medium text-gray-700"
              >
                Coupon type
              </label>
              <select
                className="mt-2 py-2.5 px-1 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md"
                name="couponType"
                id="couponType"
                onChange={handleCouponType}
              >
                {["Percentage", "Cash"].map((t, index) => (
                  <option className="capitalize" key={index} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-3">
              {couponType === "Percentage" ? (
                <>
                  <h1>Percentage</h1>
                  {(2500).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </>
              ) : (
                <h1>Cash</h1>
              )}
            </div>

            <VerticalImageInput
              cols={6}
              image={image}
              label="Choose image"
              inputName="files"
              register={register}
              onChangeImage={onChangeImage}
            />

            <ButtonsAction
              cols={6}
              title="Create"
              handleAction={handleOpenCouponForm}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCoupon;

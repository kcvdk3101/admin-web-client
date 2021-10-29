import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import ButtonsAction from "../common/ButtonsAction";
import VerticalCurrenciesSelect from "../common/VerticalCurrenciesSelect";
import VerticalDateTimeInput from "../common/VerticalDateTimeInput";
import VerticalImageInput from "../common/VerticalImageInput";
import VerticalLabelInput from "../common/VerticalLabelInput";

type FormValues = {
  couponName: string;
  description: string;
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
    limit: yup.number().positive(),
    modifier: yup.number().positive(),
    amount: yup.number().positive(),
    pointAchieve: yup.number().positive().required(),
    startTime: yup.date().required("Start time cannot be empty"),
    endTime: yup.date().required("End time cannot be empty"),
    // startTime: yup.string().required("Start time cannot be empty"),
    // endTime: yup.string().required("End time cannot be empty"),
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
  const [couponAttribute, setCouponAttribute] = useState({
    couponType: "Percentage",
    unit: "AED",
  });

  const handleChangeUnlimited = () => {
    setIsUnlimited(!isUnlimited);
  };

  const handleChangeCouponAttribute = (e: any) => {
    setCouponAttribute({ ...couponAttribute, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }
    setImage(e.target.files[0]);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const limit = data.limit === undefined ? 0 : data.limit;
    const amount = data.amount === undefined ? 0 : data.amount;

    console.log({
      couponName: data.couponName,
      couponType: couponAttribute.couponType,
      description: data.description,
      isUnlimited,
      modifier: data.modifier,
      amount,
      unit: couponAttribute.unit,
      usage: 0,
      limit,
      pointAcheive: data.pointAchieve,
      startTime: data.startTime,
      endTime: data.endTime,
      files: data.files,
    });
  };

  return (
    <div
      className={`overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center ${
        openCouponForm
          ? "backdrop-filter backdrop-blur-sm flex animate-fade-in-down"
          : "hidden"
      }`}
    >
      <div className="relative mt-96 mx-auto max-w-5xl w-1/2">
        <div className="border-0 rounded-lg shadow-lg flex flex-col bg-white outline-none focus:outline-none">
          <h3 className="text-xl md:text-2xl font-semibold pl-5 pt-5">
            Coupon Form
          </h3>
          <form
            className="grid grid-cols-6 gap-6 p-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <VerticalLabelInput
              cols={6}
              label="Coupon Name"
              inputName="couponName"
              type="text"
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
                    ? "bg-blue-400 text-white dark:bg-green-400"
                    : "bg-white text-blue-400 dark:text-green-400"
                } py-2 px-3 rounded transition duration-150`}
                type="button"
                onClick={handleChangeUnlimited}
              >
                Unlimited
              </button>
              <button
                className={`${
                  !isUnlimited
                    ? "bg-blue-400 text-white dark:bg-green-400"
                    : "bg-white text-blue-400 dark:text-green-400"
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
              {!isUnlimited && (
                <input
                  type="number"
                  id="limit"
                  className={`${
                    !isUnlimited ? "animate-fade-in-opacity" : "hidden"
                  } mt-2 p-3 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md`}
                  {...register("limit")}
                />
              )}
              {!isUnlimited && errors.limit && (
                <p className="text-red-500">{errors.limit.message}</p>
              )}
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
                id="description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <VerticalDateTimeInput
              cols={3}
              label="Start time"
              inputName="startTime"
              register={register}
              errors={errors}
            />
            <VerticalDateTimeInput
              cols={3}
              label="End time"
              inputName="endTime"
              register={register}
              errors={errors}
            />

            <hr className="col-span-6" />
            <p className="col-span-6 text-lg md:text-xl font-semibold ">
              Coupon Details
            </p>

            <VerticalLabelInput
              cols={3}
              label="Point achievement"
              inputName="pointAchieve"
              type="number"
              register={register}
              errors={errors}
            />

            <div className="col-span-3"></div>

            <div className="col-span-3">
              <label
                htmlFor="couponType"
                className="block text-sm sm:text-base font-medium text-gray-700"
              >
                Coupon type
              </label>
              <select
                className="mt-2 py-2.5 px-1 block w-full shadow-sm sm:text-sm border border-gray-500 rounded-md"
                name="couponType"
                id="couponType"
                onChange={handleChangeCouponAttribute}
              >
                {["Percentage", "Cash"].map((t, index) => (
                  <option className="capitalize" key={index} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-3">
              {couponAttribute.couponType === "Percentage" ? (
                <VerticalLabelInput
                  cols={3}
                  label="Percentage"
                  inputName="modifier"
                  type="number"
                  register={register}
                  errors={errors}
                />
              ) : (
                <VerticalCurrenciesSelect
                  label="Cash"
                  inputName="unit"
                  register={register}
                  errors={errors}
                  type={couponAttribute.couponType}
                  handleChangeCouponAttribute={handleChangeCouponAttribute}
                />
              )}
            </div>

            <VerticalImageInput
              cols={6}
              image={image}
              label="Choose image"
              inputName="files"
              type="file"
              widthImage="3/5"
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

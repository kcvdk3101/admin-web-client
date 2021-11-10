import React, { useState } from "react";
import { Coupon } from "../../../models";
import ButtonsAction from "../../common/ButtonsAction";
import VerticalCurrenciesSelect from "../../common/VerticalCurrenciesSelect";
import VerticalDateTimeInput from "../../common/VerticalDateTimeInput";
import VerticalImageInput from "../../common/VerticalImageInput";
import VerticalLabelInput from "../../common/VerticalLabelInput";
import VerticalTextareaInput from "../../common/VerticalTextareaInput";

interface EditCouponFormProps {
  coupon: Coupon;
  // image: File | undefined;
  errors: any;
  onSubmit: () => void;
  register: any;
  // isUnlimited: boolean;
  // onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // couponAttribute: any;
  // handleOpenCouponForm: () => void;
  // handleChangeUnlimited: () => void;
  // handleChangeCouponAttribute: (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => void;
}

const EditCouponForm: React.FC<EditCouponFormProps> = ({
  coupon,
  // image,
  errors,
  onSubmit,
  register,
  // isUnlimited,
  // onChangeImage,
  // couponAttribute,
  // handleOpenCouponForm,
  // handleChangeUnlimited,
  // handleChangeCouponAttribute,
}) => {
  console.log(coupon.startTime.toString());
  var someDate = new Date();
  var numberOfDaysToAdd = 3;
  var date = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

  const [isUnlimited, setIsUnlimited] = useState(coupon.limit === 0);

  const handleChangeUnlimited = () => {
    setIsUnlimited(!isUnlimited);
  };

  return (
    <form className="grid grid-cols-6 gap-3 p-6" onSubmit={onSubmit}>
      <VerticalLabelInput
        cols={6}
        label="Coupon Name"
        inputName="couponName"
        type="text"
        defaultValue={coupon.couponName}
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
            min="0"
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

      <VerticalTextareaInput
        cols={6}
        inputName="description"
        label="Description"
        defaultValue={coupon.description}
        register={register}
        errors={errors}
      />

      <VerticalDateTimeInput
        cols={3}
        label="Start time"
        inputName="startTime"
        defaultValue={coupon.startTime.toString()}
        register={register}
        errors={errors}
      />
      <VerticalDateTimeInput
        cols={3}
        label="End time"
        inputName="endTime"
        defaultValue={coupon.endTime.toString()}
        register={register}
        errors={errors}
      />

      <p className="col-span-6 text-base md:text-lg font-semibold ">
        Coupon Details
      </p>

      <VerticalLabelInput
        cols={6}
        label="Point to achieve"
        inputName="pointToAchieve"
        type="number"
        defaultValue={coupon.pointToAchieve}
        register={register}
        errors={errors}
      />

      {/* <VerticalImageInput
        cols={6}
        // image={coupon.images[0]}
        label="Choose image"
        inputName="files"
        type="file"
        widthImage="3/5"
        register={register}
        // onChangeImage={onChangeImage}
      /> */}

      {/* <ButtonsAction
        cols={6}
        title="Update"
        handleAction={handleOpenCouponForm}
      /> */}
    </form>
  );
};

export default EditCouponForm;

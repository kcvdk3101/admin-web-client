import React from "react";
import ButtonsAction from "../../common/ButtonsAction";
import VerticalCurrenciesSelect from "../../common/VerticalCurrenciesSelect";
import VerticalDateTimeInput from "../../common/VerticalDateTimeInput";
import VerticalImageInput from "../../common/VerticalImageInput";
import VerticalLabelInput from "../../common/VerticalLabelInput";

interface NewCouponFormProps {
  image: File | undefined;
  errors: any;
  onSubmit: () => void;
  register: any;
  isUnlimited: boolean;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  couponAttribute: any;
  handleOpenCouponForm: () => void;
  handleChangeUnlimited: () => void;
  handleChangeCouponAttribute: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const NewCouponForm: React.FC<NewCouponFormProps> = ({
  image,
  errors,
  onSubmit,
  register,
  isUnlimited,
  onChangeImage,
  couponAttribute,
  handleOpenCouponForm,
  handleChangeUnlimited,
  handleChangeCouponAttribute,
}) => {
  return (
    <form className="grid grid-cols-6 gap-3 p-6" onSubmit={onSubmit}>
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

      <div className="col-span-6">
        <label
          className="block text-sm sm:text-base font-medium text-gray-700"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="mt-2 p-3 block w-full text-sm sm:text-base border border-gray-500 rounded-md"
          rows={2}
          cols={10}
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
      <p className="col-span-6 text-base md:text-lg font-semibold ">
        Coupon Details
      </p>

      <VerticalLabelInput
        cols={3}
        label="Point to achieve"
        inputName="pointToAchieve"
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
          {["percentage", "cash"].map((t, index) => (
            <option className="capitalize" key={index} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-3">
        {couponAttribute.couponType === "percentage" ? (
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
  );
};

export default NewCouponForm;

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import NewCouponForm from "./NewCouponForm";

type FormValues = {
  couponName: string;
  description: string;
  modifier: number;
  amount: number;
  unit: string;
  limit: number;
  pointToAchieve: number;
  startTime: Date | string;
  endTime: Date | string;
  files: File | FileList;
};
export interface NewCouponManagementProps {
  openCouponForm: boolean;
  handleOpenCouponForm: () => void;
}

const NewCouponFormSchema = yup.object({
  couponName: yup.string().required("This field is required"),
  description: yup
    .string()
    .min(1, "Please enter more than 1 character")
    .required("This field is required"),
  limit: yup.number().positive().integer("Must be a number"),
  modifier: yup.number().positive().integer("Must be a number"),
  amount: yup.number().positive(),
  pointToAchieve: yup
    .number()
    .positive()
    .integer("Must be a number")
    .min(1, "Minimum point is 1")
    .max(100, "Maximum point is 100")
    .required("This field is required"),
  startTime: yup
    .date()
    .min(
      new Date().toLocaleDateString(),
      `Must be later than ${new Date().toLocaleDateString()}`
    )
    .required("Start time cannot be empty"),
  endTime: yup
    .date()
    .min(yup.ref("startTime"), "End date can't be before start date"),
  files: yup.mixed().required("This field is required"),
});

const NewCouponManagement: React.FC<NewCouponManagementProps> = ({
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
  const [isUnlimited, setIsUnlimited] = useState<boolean>(true);
  const [couponAttribute, setCouponAttribute] = useState({
    couponType: "percentage",
    unit: "",
  });

  const handleChangeUnlimited = () => {
    setIsUnlimited(!isUnlimited);
  };

  const handleChangeCouponAttribute = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCouponAttribute({ ...couponAttribute, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }
    setImage(e.target.files[0]);
  };

  const onSubmit = handleSubmit((data) => {
    const amount = data.amount === undefined ? 0 : data.amount;
    const limit = data.limit === undefined ? 0 : data.limit;

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
      pointToAchieve: data.pointToAchieve,
      startTime: data.startTime.toLocaleString(),
      endTime: data.endTime.toLocaleString(),
      files: image,
    });
  });

  return (
    <div
      className={`overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center ${
        openCouponForm
          ? "backdrop-filter backdrop-blur-sm flex animate-fade-in-down"
          : "hidden"
      }`}
    >
      <div className="fixed left-1/2 top-0 transform -translate-x-1/2 w-1/2 rounded-lg shadow-lg flex flex-col bg-white">
        <div className="flex justify-between">
          <h3 className="text-xl md:text-2xl font-semibold pl-5 pt-5">
            Coupon Form
          </h3>
          <button
            className="px-5 pt-5"
            type="button"
            onClick={handleOpenCouponForm}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <NewCouponForm
          image={image}
          errors={errors}
          onSubmit={onSubmit}
          register={register}
          isUnlimited={isUnlimited}
          onChangeImage={onChangeImage}
          couponAttribute={couponAttribute}
          handleOpenCouponForm={handleOpenCouponForm}
          handleChangeUnlimited={handleChangeUnlimited}
          handleChangeCouponAttribute={handleChangeCouponAttribute}
        />
      </div>
    </div>
  );
};

export default NewCouponManagement;

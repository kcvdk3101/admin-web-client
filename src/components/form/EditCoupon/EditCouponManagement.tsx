import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Coupon } from "../../../models";
import * as yup from "yup";
import EditCouponForm from "./EditCouponForm";

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

interface EditCouponManagementProps {}

const EditCouponFormSchema = yup.object({
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

const EditCouponManagement: React.FC<EditCouponManagementProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(EditCouponFormSchema),
  });

  const history = useHistory() as any;

  const onSubmit = handleSubmit((data) => {});

  return (
    <div className="w-full animate-fade-in-down">
      <h3 className="text-xl md:text-2xl font-semibold pl-5 pt-5">
        Edit Coupon
      </h3>
      <div className="w-1/2">
        <EditCouponForm
          coupon={history.location.state.coupon}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default EditCouponManagement;

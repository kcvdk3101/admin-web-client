import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NewCoupon from "../../components/form/NewCoupon";
import { typesOfCoupon } from "../../constant";
import { mockCoupons } from "../../db/mockCoupons";
import { Utilities } from "../../helpers/utils/index";
import { Coupon } from "../../models";

function filterCoupons(coupons: Coupon[], typeOfCoupon: string) {
  if (typeOfCoupon === "" || typeOfCoupon === "All") return coupons;
  return coupons.filter(
    (coupon) => coupon.couponType === typeOfCoupon.toLowerCase()
  );
}
interface CardCouponViewProps extends Coupon {
  handleDeleteCard?: () => void;
}

const CardCouponView: React.FC<CardCouponViewProps> = ({
  couponName,
  couponType,
  modifier,
  amount,
  unit,
  usage,
  limit,
  pointAchieve,
  startTime,
  endTime,
  image,
  handleDeleteCard,
}) => {
  const isAlertWhenUsedUp =
    usage === limit
      ? "text-red-500 dark:text-red-500"
      : "text-blue-800 dark:text-green-400";

  return (
    <div className="rounded">
      <img
        src={image}
        alt=" random imgee"
        className="w-full object-cover object-center rounded-lg shadow-md"
      />
      <div className="relative px-2 -mt-16">
        <div className="bg-white p-4 rounded-lg shadow-lg transition duration-200 ease-in-out">
          <div className="w-full flex justify-between items-center">
            <p className="text-xs uppercase truncate">{couponName}</p>
            <p className="flex-shrink-0 text-xs uppercase text-gray-700">
              {Utilities.convertDateString(startTime)} -{" "}
              {Utilities.convertDateString(endTime)}
            </p>
          </div>
          <h4 className="mt-1 text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold uppercase truncate text-blue-600 dark:text-green-500">
            {couponType === "cash" ? amount : modifier}
            <span className="lowercase text-xl text-gray-500 ml-1 dark:text-gray-500">
              {couponType === "cash" ? unit : "%"}
            </span>
          </h4>
          <p className="mt-1 text-xs lg:text-base text-gray-400">
            This coupon card changes {pointAchieve} points
          </p>
          <div className="flex justify-between items-center mt-4">
            <p className={`text-xs lg:text-base ${isAlertWhenUsedUp}`}>
              {usage}/{limit} card been used
            </p>
            <button className="py-1 px-3 rounded text-sm md:text-base transition duration-150 text-gray-700 hover:bg-red-500 hover:text-white hover:shadow-md">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CouponComponent: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [openCouponForm, setOpenCouponForm] = useState<boolean>(false);
  const [typeOfCoupon, setTypeOfCoupon] = useState<string>("");

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleOpenCouponForm = () => {
    setOpenCouponForm(!openCouponForm);
  };

  function handleChangeType(type: string) {
    setTypeOfCoupon(type);
    setOpenDropdown(false);
  }

  const handleDeleteCoupon = () => {
    toast.success("Coupon deleted!");
  };

  return (
    <div className="p-5 md:p-7 lg:p-10 dark:bg-gray-600">
      <div className="flex justify-between items-center w-full my-2 md:my-5">
        <div className="relative">
          <button
            className="flex items-center text-blue-500 capitalize text-base md:text-lg xl:text-2xl font-bold px-4 py-2 hover:shadow-sm outline-none focus:outline-none dark:text-green-500"
            type="button"
            onClick={handleOpenDropdown}
          >
            Filter
          </button>
          <div
            className={`${
              openDropdown ? "block" : "hidden"
            } bg-white absolute  animate-fade-in-down text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1`}
          >
            {typesOfCoupon.map((type, index) => (
              <p
                key={index}
                className="cursor-pointer text-sm md:text-base py-2 px-4 block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                onClick={() => handleChangeType(type)}
              >
                {type}
              </p>
            ))}
          </div>
        </div>
        <div>
          <button
            className="py-1.5 px-3 md:py-2 md:px-4 rounded transition duration-150 bg-blue-500 text-sm md:text-base lg:text-lg text-white hover:shadow-md dark:bg-green-500"
            onClick={handleOpenCouponForm}
          >
            Add new
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 animate-fade-in-down">
        {filterCoupons(coupons, typeOfCoupon).map((coupon, index) => (
          <CardCouponView
            key={index}
            couponName={coupon.couponName}
            couponType={coupon.couponType}
            modifier={coupon.modifier}
            amount={coupon.amount}
            unit={coupon.unit}
            usage={coupon.usage}
            limit={coupon.limit}
            pointAchieve={coupon.pointAchieve}
            startTime={coupon.startTime}
            endTime={coupon.endTime}
            image={coupon.image}
            handleDeleteCard={handleDeleteCoupon}
          />
        ))}
      </div>
      <div
        className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center ${
          openCouponForm
            ? "backdrop-filter backdrop-blur-sm flex animate-fade-in-down"
            : "hidden"
        }`}
      >
        <NewCoupon handleOpenCouponForm={handleOpenCouponForm} />
      </div>
    </div>
  );
};

export default CouponComponent;

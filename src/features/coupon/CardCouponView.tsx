import React from "react";
import { Utilities } from "../../helpers/utils";
import { Coupon } from "../../models";

interface CardCouponViewProps {
  coupon: Coupon;
  handleDeleteCoupon: (id: string) => void;
  handleEditCoupon: (coupon: Coupon) => void;
}

const CardCouponView: React.FC<CardCouponViewProps> = ({
  coupon,
  handleDeleteCoupon,
  handleEditCoupon,
}) => {
  const {
    id,
    code,
    couponName,
    couponType,
    modifier,
    amount,
    unit,
    usage,
    limit,
    pointToAchieve,
    startTime,
    endTime,
    images,
  } = coupon;

  return (
    <div className="rounded animate-fade-in-down">
      <img
        src={images && images[0].url}
        alt="random imgee"
        className="w-full object-cover object-center max-h-60 rounded-lg shadow-md bg-white"
      />
      <div className="relative px-2 -mt-20">
        <div className="bg-white p-4 rounded-lg shadow-lg transition duration-200 ease-in-out">
          <div className="w-full flex justify-between items-center">
            <p className="text-xs lg:text-base text-gray-400">Code: {code}</p>
            <p className="flex-shrink-0 text-xs uppercase text-gray-700">
              {Utilities.convertDateString(startTime)} -{" "}
              {Utilities.convertDateString(endTime)}
            </p>
          </div>
          <h4 className="mt-1 text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold uppercase truncate text-blue-600 dark:text-green-500">
            {couponType === "cash"
              ? Utilities.convertToCurrency(amount)
              : modifier}
            <span className="uppercase text-lg text-gray-500 ml-1 dark:text-gray-500">
              {couponType === "cash" ? unit : "%"}
            </span>
          </h4>
          <div className="flex justify-between items-center mt-2">
            <p className="flex-1 text-xs lg:text-base uppercase truncate">
              {couponName}
            </p>
            <p className="flex-shrink-0 text-xs lg:text-base ml-5 text-gray-400">
              Point: {pointToAchieve}
            </p>
          </div>
          <div className="flex justify-between items-center mt-5">
            {limit === 0 ? (
              <div className="flex justify-center items-center text-xs text-blue-700 dark:text-green-400 lg:text-base ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-2">Unlimited usage</p>
              </div>
            ) : (
              <p className="text-xs text-blue-700 dark:text-green-400 lg:text-base">
                {usage}/{limit} card been used
              </p>
            )}
            <div>
              <button
                className="py-1 px-3 rounded text-sm md:text-base transition duration-150 text-gray-700 hover:bg-yellow-500 hover:text-white hover:shadow-md"
                onClick={() => handleEditCoupon(coupon)}
              >
                Edit
              </button>
              <button
                className="py-1 px-3 rounded text-sm md:text-base transition duration-150 text-gray-700 hover:bg-red-500 hover:text-white hover:shadow-md"
                onClick={() => handleDeleteCoupon(id)}
              >
                Disable
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCouponView;

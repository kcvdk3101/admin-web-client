import React from "react";
import { Coupon } from "../../models";
import { Utilities } from "../../helpers/utils/index";
import { mockCoupons } from "../../db/mockCoupons";

const CardCouponView: React.FC<Coupon> = ({
  name,
  type,
  modifier,
  amount,
  unit,
  usage,
  limit,
  pointAchieve,
  startTime,
  endTime,
  image,
}) => {
  const isAlertWhenUsedUp =
    usage === limit
      ? "text-red-500 dark:text-red-500"
      : "text-blue-800 dark:text-green-200";

  return (
    <div className="rounded">
      <img
        src={image}
        alt=" random imgee"
        className="w-full object-cover object-center rounded-lg shadow-md"
      />
      <div className="relative px-2 -mt-16">
        <div className="bg-white p-4 rounded-lg shadow-lg dark:bg-gray-700 transition duration-200 ease-in-out">
          <div className="w-full flex justify-between items-center">
            <p className="text-xs uppercase truncate dark:text-white">{name}</p>
            <p className="flex-shrink-0 text-xs uppercase text-gray-500 dark:text-white">
              {Utilities.convertDateString(startTime)} -{" "}
              {Utilities.convertDateString(endTime)}
            </p>
          </div>
          <h4 className="mt-1 text-3xl font-bold uppercase leading-tight truncate text-blue-600 dark:text-green-600">
            {type === "cash" ? amount : modifier}
            <span className="lowercase text-xl text-gray-500 ml-1">
              {type === "cash" ? unit : "%"}
            </span>
          </h4>
          <p className="mt-1 text-sm text-gray-400">
            This coupon card changes {pointAchieve} points
          </p>
          <p className={`text-md mt-4 ${isAlertWhenUsedUp}`}>
            {usage}/{limit} card been used
          </p>
        </div>
      </div>
    </div>
  );
};

const CouponComponent: React.FC = () => {
  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {mockCoupons.map((coupon) => (
        <CardCouponView
          name={coupon.couponName}
          type={coupon.couponType}
          modifier={coupon.modifier}
          amount={coupon.amount}
          unit={coupon.unit}
          usage={coupon.usage}
          limit={coupon.limit}
          pointAchieve={coupon.pointAchieve}
          startTime={coupon.startTime}
          endTime={coupon.endTime}
          image={coupon.image}
        />
      ))}
    </div>
  );
};

export default CouponComponent;

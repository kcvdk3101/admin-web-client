import React from "react";
import { typesOfCoupon } from "../../constant";
import { mockCurrencies } from "../../db/mockCurrencies";

interface SortCouponNavigationProps {
  handleOpenDropdown: () => void;
  typeOfCoupon: string;
  handleChangeUnit: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  openDropdown: boolean;
  handleChangeType: (type: string) => void;
  handleOpenCouponForm: () => void;
}

const SortCouponNavigation: React.FC<SortCouponNavigationProps> = ({
  handleOpenDropdown,
  typeOfCoupon,
  handleChangeUnit,
  openDropdown,
  handleChangeType,
  handleOpenCouponForm,
}) => {
  return (
    <div className="grid grid-cols-12 my-2 md:my-5 ">
      <div className="relative col-span-10 grid grid-cols-12">
        <button
          className="col-span-1 text-blue-500 capitalize text-base md:text-lg xl:text-xl font-bold hover:shadow-sm outline-none focus:outline-none dark:text-green-500"
          type="button"
          onClick={handleOpenDropdown}
        >
          Sort
        </button>
        {typeOfCoupon === "cash" && (
          <div className="flex items-center ml-10 animate-fade-in-down">
            <p className="text-sm md:text-base mr-3 text-blue-500 font-bold dark:text-green-500">
              Unit
            </p>
            <select
              className="block px-1 py-3 shadow-sm sm:text-sm border border-blue-500 rounded-md focus:outline-none focus:border-blue-500 dark:border-green-500 dark:bg-gray-200 dark:focus:border-green-500"
              onChange={handleChangeUnit}
            >
              <option value="">all</option>
              {mockCurrencies.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}
        <div
          className={`${
            openDropdown ? "block" : "hidden"
          } bg-white absolute animate-fade-in-down text-base top-12 z-50 py-2 list-none text-left rounded shadow-lg`}
        >
          {typesOfCoupon.map((type, index) => (
            <p
              key={index}
              className="cursor-pointer capitalize text-sm md:text-base py-2 px-4 block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
              onClick={() => handleChangeType(type)}
            >
              {type}
            </p>
          ))}
        </div>
      </div>
      <div className="col-start-12">
        <button
          className="py-1.5 px-3 rounded transition duration-150 bg-blue-500 text-sm md:text-base lg:text-lg text-white hover:shadow-md dark:bg-green-500"
          onClick={handleOpenCouponForm}
        >
          Add new
        </button>
      </div>
    </div>
  );
};

export default SortCouponNavigation;

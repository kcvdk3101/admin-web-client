import React, { useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../../components/common/Pagination";
import NewCoupon from "../../components/form/NewCoupon/NewCouponManagement";
import { mockCoupons } from "../../db/mockCoupons";
import { Coupon } from "../../models";
import CardCouponView from "./CardCouponView";
import SortCouponNavigation from "./SortCouponNavigation";

function filterCouponsByUnit(coupons: Coupon[], unitOfCoupon: string) {
  if (unitOfCoupon === "" || unitOfCoupon === "all") return coupons;
  return coupons.filter(
    (coupon) => coupon.unit === unitOfCoupon && { ...coupon }
  );
}

function filterCouponsByType(coupons: Coupon[], typeOfCoupon: string) {
  if (typeOfCoupon === "" || typeOfCoupon === "all") return coupons;
  return coupons.filter(
    (coupon) => coupon.couponType === typeOfCoupon.toLowerCase()
  );
}

const CouponComponent: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [openCouponForm, setOpenCouponForm] = useState<boolean>(false);
  const [typeOfCoupon, setTypeOfCoupon] = useState<string>("");
  const [unitOfCoupon, setUnitOfCoupon] = useState<string>("");

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  const handleOpenCouponForm = () => {
    setOpenCouponForm(!openCouponForm);
  };
  function handleChangeType(type: string) {
    if (type === "All") {
      setUnitOfCoupon("");
    }
    setTypeOfCoupon(type);
    setOpenDropdown(false);
  }
  function handleChangeUnit(e: React.ChangeEvent<HTMLSelectElement>) {
    setUnitOfCoupon(e.target.value);
  }
  const handleDeleteCoupon = (id: string) => {
    toast.success("Coupon deleted!");
  };

  const handleEditCoupon = () => {
    toast.success("Coupon edit!");
  };

  const [currentPage, setCurrentPage] = useState(1);

  const totalArray = filterCouponsByUnit(
    filterCouponsByType(coupons, typeOfCoupon),
    unitOfCoupon
  ).length;

  const couponsPerPage = totalArray < 6 ? totalArray : 6;

  // Get current posts
  const indexOfLast = currentPage * couponsPerPage;
  const indexOfFirst = indexOfLast - couponsPerPage;

  const currentArray = filterCouponsByUnit(
    filterCouponsByType(coupons, typeOfCoupon),
    unitOfCoupon
  ).slice(indexOfFirst, indexOfLast);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className="flex flex-col p-5 md:p-7 lg:p-10 dark:bg-gray-600">
      <SortCouponNavigation
        handleOpenDropdown={handleOpenDropdown}
        typeOfCoupon={typeOfCoupon}
        handleChangeUnit={handleChangeUnit}
        openDropdown={openDropdown}
        handleChangeType={handleChangeType}
        handleOpenCouponForm={handleOpenCouponForm}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 animate-fade-in-down">
        {filterCouponsByUnit(
          filterCouponsByType(coupons, typeOfCoupon),
          unitOfCoupon
        ).length === 0 ? (
          <h1 className="text-2xl dark:text-white">Result is empty</h1>
        ) : (
          filterCouponsByUnit(
            filterCouponsByType(currentArray, typeOfCoupon),
            unitOfCoupon
          ).map((coupon, index) => (
            <CardCouponView
              key={index}
              id={coupon.id}
              couponName={coupon.couponName}
              couponType={coupon.couponType}
              modifier={coupon.modifier}
              amount={coupon.amount}
              isUnlimited={coupon.isUnlimited}
              unit={coupon.unit}
              usage={coupon.usage}
              limit={coupon.limit}
              pointToAchieve={coupon.pointToAchieve}
              startTime={coupon.startTime}
              endTime={coupon.endTime}
              image={coupon.image}
              handleDeleteCoupon={handleDeleteCoupon}
              handleEditCoupon={handleEditCoupon}
            />
          ))
        )}
      </div>
      <Pagination
        arrayPerPage={couponsPerPage}
        totalArray={totalArray}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        currentPage={currentPage}
      />
      <NewCoupon
        openCouponForm={openCouponForm}
        handleOpenCouponForm={handleOpenCouponForm}
      />
    </div>
  );
};

export default CouponComponent;

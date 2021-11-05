import React, { useState } from "react";
import { toast } from "react-toastify";
import PaginationNumberedList from "../../components/pagination/PaginationNumberedList";
import NewCouponManagement from "../../components/form/NewCoupon/NewCouponManagement";
import { mockCoupons } from "../../db/mockCoupons";
import { Coupon } from "../../models";
import CardCouponView from "./CardCouponView";
import SortCouponNavigation from "./SortCouponNavigation";

function isShowAllTypeOfCoupon(type: string) {
  return type === "" || type === "all";
}

function filterCouponsByUnit(coupons: Coupon[], unitOfCoupon: string) {
  if (isShowAllTypeOfCoupon(unitOfCoupon)) return coupons;
  return coupons.filter(
    (coupon) => coupon.unit === unitOfCoupon && { ...coupon }
  );
}

function filterCouponsByType(coupons: Coupon[], typeOfCoupon: string) {
  if (isShowAllTypeOfCoupon(typeOfCoupon)) return coupons;
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
  const [currentPage, setCurrentPage] = useState(1);

  const totalArray = filterCouponsByUnit(
    filterCouponsByType(coupons, typeOfCoupon),
    unitOfCoupon
  ).length;
  const couponsPerPage = totalArray < 6 ? totalArray : 6;

  const indexOfLast = currentPage * couponsPerPage;
  const indexOfFirst = indexOfLast - couponsPerPage;

  const currentArray = filterCouponsByUnit(
    filterCouponsByType(coupons, typeOfCoupon),
    unitOfCoupon
  ).slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  const handleOpenCouponForm = () => {
    setOpenCouponForm(!openCouponForm);
  };

  function handleChangeType(type: string) {
    if (type === "all" || type === "percentage") {
      setUnitOfCoupon("all");
    }
    setTypeOfCoupon(type);
    setOpenDropdown(false);
    setCurrentPage(1);
  }
  function handleChangeUnit(e: React.ChangeEvent<HTMLSelectElement>) {
    setUnitOfCoupon(e.target.value);
    setCurrentPage(1);
  }

  const handleDeleteCoupon = (id: string) => {
    toast.success("Coupon deleted!");
  };

  const handleEditCoupon = () => {
    toast.success("Coupon edit!");
  };

  return (
    <div className="flex flex-col p-5 md:p-7 lg:p-10 dark:bg-gray-600">
      <SortCouponNavigation
        openDropdown={openDropdown}
        typeOfCoupon={typeOfCoupon}
        handleChangeUnit={handleChangeUnit}
        handleChangeType={handleChangeType}
        handleOpenDropdown={handleOpenDropdown}
        handleOpenCouponForm={handleOpenCouponForm}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 animate-fade-in-down">
        {filterCouponsByUnit(
          filterCouponsByType(currentArray, typeOfCoupon),
          unitOfCoupon
        ).length === 0 ? (
          <h1 className="text-2xl dark:text-white">Result is empty.</h1>
        ) : (
          filterCouponsByUnit(
            filterCouponsByType(currentArray, typeOfCoupon),
            unitOfCoupon
          ).map((coupon, index) => (
            <CardCouponView
              key={index}
              coupon={coupon}
              handleDeleteCoupon={handleDeleteCoupon}
              handleEditCoupon={handleEditCoupon}
            />
          ))
        )}
      </div>
      <PaginationNumberedList
        currentPage={currentPage}
        arrayPerPage={couponsPerPage}
        totalArray={totalArray}
        paginate={paginate}
      />
      <NewCouponManagement
        openCouponForm={openCouponForm}
        handleOpenCouponForm={handleOpenCouponForm}
      />
    </div>
  );
};

export default CouponComponent;

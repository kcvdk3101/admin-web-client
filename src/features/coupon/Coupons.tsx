import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import EditCouponManagement from "../../components/form/EditCoupon/EditCouponManagement";
import NewCouponManagement from "../../components/form/NewCoupon/NewCouponManagement";
import PaginationNumberedList from "../../components/pagination/PaginationNumberedList";
import { Coupon } from "../../models";
import CardCouponView from "./CardCouponView";
import CouponsSkeleton from "./CouponsSkeleton";
import { getAllCoupons } from "./couponsSlice";
import SortCouponNavigation from "./SortCouponNavigation";

const Coupons: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();
  let paginationQuery = queryString.parse(search);
  const limit = paginationQuery.limit ? +paginationQuery.limit : 0;
  const offset = paginationQuery.offset ? +paginationQuery.offset : 0;

  const dispatch = useAppDispatch();
  const fetchingCoupons = useAppSelector(
    (state) => state.coupons.fetchingCoupons
  );
  const coupons = useAppSelector((state) => state.coupons.coupons);
  const totalCoupons = useAppSelector(
    (state) => state.coupons.pagination.total
  );

  const [openCouponForm, setOpenCouponForm] = useState<boolean>(false);
  const [openEditCouponForm, setOpenEditCouponForm] = useState<boolean>(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon>();
  // const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  // const [typeOfCoupon, setTypeOfCoupon] = useState<string>("");
  // const [unitOfCoupon, setUnitOfCoupon] = useState<string>("");
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllCoupons(0));
  }, []);

  const paginate = (pageNumber: number) => {
    history.push({
      pathname: "/admin/coupons",
      search: `?limit=${limit}&offset=${pageNumber - 1}`,
    });
    dispatch(getAllCoupons(pageNumber - 1));
  };

  const handleOpenCouponForm = () => {
    setOpenCouponForm(!openCouponForm);
  };

  const handleOpenEditCouponForm = () => {
    setOpenEditCouponForm(!openEditCouponForm);
  };

  const handleDeleteCoupon = (id: string) => {
    toast.success(`Coupon deleted ${id}!`);
  };

  function handleEditCoupon(coupon: Coupon) {
    setSelectedCoupon(coupon);
    handleOpenEditCouponForm();
  }

  // const handleOpenDropdown = () => {
  //   setOpenDropdown(!openDropdown);
  // };

  // function handleChangeType(type: string) {
  //   if (type === "all" || type === "percentage") {
  //     setUnitOfCoupon("all");
  //   }
  //   setTypeOfCoupon(type);
  //   setOpenDropdown(false);
  //   setCurrentPage(1);
  // }
  // function handleChangeUnit(e: React.ChangeEvent<HTMLSelectElement>) {
  //   setUnitOfCoupon(e.target.value);
  //   setCurrentPage(1);
  // }

  return (
    <div className="flex flex-col p-5 dark:bg-gray-600 w-full">
      <div>
        <button
          className={`${
            fetchingCoupons && "cursor-not-allowed"
          } my-5 py-1.5 px-3 rounded transition duration-150 bg-blue-500 text-sm md:text-base lg:text-lg text-white hover:shadow-md dark:bg-green-500`}
          onClick={handleOpenCouponForm}
          disabled={fetchingCoupons}
        >
          Add new
        </button>
      </div>
      {/* <SortCouponNavigation
        openDropdown={openDropdown}
        typeOfCoupon={typeOfCoupon}
        handleChangeUnit={handleChangeUnit}
        handleChangeType={handleChangeType}
        handleOpenDropdown={handleOpenDropdown}
        handleOpenCouponForm={handleOpenCouponForm}
      /> */}
      {fetchingCoupons ? (
        <CouponsSkeleton n={limit} />
      ) : coupons.length === 0 ? (
        <h1 className="text-xl dark:text-white">Result is empty</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 animate-fade-in-down">
          {coupons.map((coupon, index) => (
            <CardCouponView
              key={index}
              coupon={coupon}
              handleDeleteCoupon={handleDeleteCoupon}
              handleEditCoupon={handleEditCoupon}
            />
          ))}
        </div>
      )}
      <PaginationNumberedList
        totalArray={totalCoupons}
        arrayPerPage={limit}
        currentPage={offset}
        paginate={paginate}
      />
      <NewCouponManagement
        openCouponForm={openCouponForm}
        handleOpenCouponForm={handleOpenCouponForm}
      />
      <EditCouponManagement
        coupon={selectedCoupon}
        openEditCouponForm={openEditCouponForm}
        handleOpenEditCouponForm={handleOpenEditCouponForm}
      />
    </div>
  );
};

export default Coupons;

import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import EmptyResult from "../../components/common/EmptyResult";
import DeleteCoupon from "../../components/form/Coupon/DeleteCoupon/DeleteCoupon";
import EditCouponManagement from "../../components/form/Coupon/EditCoupon/EditCouponManagement";
import NewCouponManagement from "../../components/form/Coupon/NewCoupon/NewCouponManagement";
import PaginationNumberedList from "../../components/pagination/PaginationNumberedList";
import { Coupon } from "../../models";
import AddNewCouponButton from "./AddNewCouponButton";
import CardCouponView from "./CardCouponView";
import CouponsSkeleton from "./CouponsSkeleton";
import {
  getAllCoupons,
  getAllCouponsByCouponType,
  updateStatusCoupon,
} from "./couponsThunk";
import SortCouponByType from "./SortCouponByType";

const Coupons: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();
  let paginationQuery = queryString.parse(search);
  const limit = paginationQuery.limit ? +paginationQuery.limit : 0;
  const offset = paginationQuery.offset ? +paginationQuery.offset : 0;
  const couponType =
    paginationQuery.couponType && (paginationQuery.couponType as string);

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
  const [openDeleteCouponForm, setOpenDeleteCouponForm] =
    useState<boolean>(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon>();

  useEffect(() => {
    (function () {
      if (couponType)
        return dispatch(getAllCouponsByCouponType({ offset: 0, couponType }));
      dispatch(getAllCoupons(offset));
    })();
  }, [couponType]);

  const paginate = (pageNumber: number) => {
    if (couponType) {
      history.push({
        pathname: "/admin/coupons",
        search: `?limit=${limit}&offset=${
          pageNumber - 1
        }&couponType=${couponType}`,
      });
      dispatch(
        getAllCouponsByCouponType({ offset: pageNumber - 1, couponType })
      );
      return;
    }
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

  const handleOpenDeleteCouponForm = () => {
    setOpenDeleteCouponForm(!openDeleteCouponForm);
  };

  function handleEditCoupon(coupon: Coupon) {
    setSelectedCoupon(coupon);
    handleOpenEditCouponForm();
  }

  function handleDeleteCoupon(coupon: Coupon) {
    setSelectedCoupon(coupon);
    handleOpenDeleteCouponForm();
  }

  async function handleUpdateStatusCoupon(id: string) {
    try {
      dispatch(updateStatusCoupon(id));
    } catch (error) {
      toast.error(error as Error);
    }
  }

  return (
    <div className="flex flex-col p-5 dark:bg-gray-600 w-full">
      <AddNewCouponButton
        fetchingCoupons={fetchingCoupons}
        handleOpenCouponForm={handleOpenCouponForm}
      />
      <SortCouponByType />
      {fetchingCoupons ? (
        <CouponsSkeleton n={limit} />
      ) : coupons.length === 0 ? (
        <EmptyResult />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 animate-fade-in-down">
          {coupons.map((coupon, index) => (
            <CardCouponView
              key={index}
              coupon={coupon}
              handleDeleteCoupon={handleDeleteCoupon}
              handleEditCoupon={handleEditCoupon}
              handleUpdateStatusCoupon={handleUpdateStatusCoupon}
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
      <DeleteCoupon
        coupon={selectedCoupon}
        openDialog={openDeleteCouponForm}
        handleOpenDeleteCouponForm={handleOpenDeleteCouponForm}
      />
    </div>
  );
};

export default Coupons;

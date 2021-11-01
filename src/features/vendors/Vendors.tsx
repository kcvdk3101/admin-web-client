import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import VendorActivaion from "../../components/form/VendorActivaion";
import { Utilities } from "../../helpers/utils";
import { getAllVendors } from "./vendorsSlice";

const TableHeader = () => {
  return (
    <thead className="bg-blue-50 dark:bg-green-50 transition duration-150">
      <tr>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Name
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Hotline
        </th>

        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Join in
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Status
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
};

const Vendors = () => {
  const dispatch = useAppDispatch();
  const vendors = useAppSelector((state) => state.vendors.vendors);
  const [selectedVendorId, setSelectedVendorId] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  useEffect(() => {
    dispatch(getAllVendors());
  }, [dispatch]);

  return (
    <main className="main-each-page">
      <table className="w-full divide-y divide-gray-200 round shadow-md animate-fade-in-down">
        <TableHeader />
        <tbody className="bg-white divide-y divide-gray-200">
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col justify-center items-start">
                  <h4 className="text-sm font-medium text-gray-900">
                    {vendor.name}
                  </h4>
                  <p className="text-sm text-gray-500">{vendor.email}</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm text-gray-500">{vendor.hotline}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {Utilities.convertDateString(vendor.registeredAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                    vendor.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {vendor.isActive ? "Activated" : "Inactivated"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <button
                  className={`${
                    vendor.isActive
                      ? "cursor-not-allowed bg-gray-500 dark:bg-gray-500"
                      : "bg-blue-600 dark:bg-green-600"
                  } text-white py-2 px-4 rounded hover:shadow-md transition-all duration-150 outline-none`}
                  onClick={() => {
                    setSelectedVendorId(vendor.id);
                    handleOpenDialog();
                  }}
                  disabled={vendor.isActive}
                >
                  Activate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center ${
          openDialog
            ? "backdrop-filter backdrop-blur-sm flex animate-fade-in-down"
            : "hidden"
        }`}
      >
        <VendorActivaion
          selectedVendorId={selectedVendorId}
          handleOpenDialog={handleOpenDialog}
        />
      </div>
    </main>
  );
};

export default Vendors;

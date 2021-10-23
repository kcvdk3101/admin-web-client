import React, { useEffect, useState } from "react";
import { IoArrowForward, IoAddCircleSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ParentCategory from "../../components/form/ParentCategory";
import { getAllCategories } from "./categoriesSlice";

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);

  const [selectedSecondCategory, setSelectedSecondCategory] =
    useState<string>();
  const [selectedThirdCategory, setSelectedThirdCategory] = useState<string>();
  const [openFirstCategoryForm, setOpenFirstCategoryForm] = useState(false);
  const [openSecondCategoryForm, setOpenSecondCategoryForm] = useState(false);

  const handleSelectSecondCategory = (id: string) => {
    setSelectedSecondCategory(id);
  };
  const handleSelectThirdCategory = (id: string) => {
    setSelectedThirdCategory(id);
  };
  const handleFirstCategoryForm = () => {
    setOpenFirstCategoryForm(!openFirstCategoryForm);
  };

  const secondCategory = categories.find(
    (category) => category.id === selectedSecondCategory
  );
  const thirdCategory = secondCategory?.children?.find(
    (category) => category.id === selectedThirdCategory
  );

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <main className="w-full p-4 flex flex-col justify-center items-center dark:bg-gray-600">
      <h1 className="mb-4 text-2xl md:text-4xl dark:text-white dark:font-bold">
        Categories
      </h1>
      <section className=" w-full h-screen md:h-full flex">
        <div className="category-first-depth">
          <p className="flex justify-between items-center px-2 text-center font-bold text-lg md:text-xl dark:text-green-600">
            First Depth
            <IoAddCircleSharp
              className="btn-add"
              onClick={handleFirstCategoryForm}
            />
          </p>
          <div className="overflow-x-hidden overflow-y-auto h-screen px-3">
            {categories.map((category) => (
              <p
                key={category.id}
                className="truncate animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
                onClick={() => handleSelectSecondCategory(category.id)}
              >
                {category.name}
                <IoArrowForward />
              </p>
            ))}
          </div>
        </div>
        <div className="category-second-depth ">
          <p className="flex justify-between items-center px-2 text-center font-bold text-lg md:text-xl dark:text-green-600">
            Second Depth
            <IoAddCircleSharp className="btn-add" />
          </p>
          <div className="overflow-x-hidden overflow-y-auto h-screen px-3">
            {secondCategory?.children?.map((category) => (
              <p
                key={category.id}
                className="truncate animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
                onClick={() => handleSelectThirdCategory(category.id)}
              >
                {category.name}
                <IoArrowForward />
              </p>
            ))}
          </div>
        </div>
        <div className="category-third-depth">
          <p className="text-left font-bold text-lg md:text-xl dark:text-green-600">
            Third Depth
          </p>
          <div className="overflow-x-hidden overflow-y-auto h-screen px-3"></div>
        </div>
      </section>
      <div
        className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center ${
          openFirstCategoryForm
            ? "backdrop-filter backdrop-blur-sm flex animate-fade-in-down"
            : "hidden"
        }`}
      >
        <ParentCategory handleFirstCategoryForm={handleFirstCategoryForm} />
      </div>
    </main>
  );
};

export default Categories;

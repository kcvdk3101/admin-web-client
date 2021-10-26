import React, { useEffect, useState } from "react";
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
      <div className="flex justify-between w-full mb-4 font-bold text-2xl md:text-4xl dark:text-white dark:font-bold">
        <h1>Categories</h1>
        <div className="flex">
          <button
            type="button"
            className="cursor-pointer rounded px-3 text-center text-md md:text-lg hover:bg-blue-500 hover:text-white dark:text-green-600 dark:bg-white dark:hover:bg-green-400 dark:hover:text-white transition duration-150"
            onClick={handleFirstCategoryForm}
          >
            Add parent category
          </button>
          <button
            className="cursor-pointer rounded px-3 text-center text-md md:text-lg hover:bg-blue-500 hover:text-white dark:text-green-600 dark:bg-white dark:hover:bg-green-400 dark:hover:text-white transition duration-150 ml-2"
            onClick={handleFirstCategoryForm}
          >
            Add child category
          </button>
        </div>
      </div>
      <section className=" w-full h-screen md:h-full flex">
        <div className="category-first-depth">
          <p className="px-2 text-center font-bold text-lg md:text-xl dark:text-green-600">
            First Depth
          </p>
          <div className="overflow-x-hidden overflow-y-auto h-screen px-3">
            {categories.map((category) => (
              <p
                key={category.id}
                className="truncate animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
                onClick={() => handleSelectSecondCategory(category.id)}
              >
                {category.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </p>
            ))}
          </div>
        </div>
        <div className="category-second-depth ">
          <p className="px-2 text-center font-bold text-lg md:text-xl dark:text-green-600">
            Second Depth
          </p>
          <div className="overflow-x-hidden overflow-y-auto h-screen px-3">
            {secondCategory?.children?.map((category) => (
              <p
                key={category.id}
                className="truncate animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
                onClick={() => handleSelectThirdCategory(category.id)}
              >
                {category.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </p>
            ))}
          </div>
        </div>
        <div className="category-third-depth">
          <p className="text-center font-bold text-lg md:text-xl dark:text-green-600">
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

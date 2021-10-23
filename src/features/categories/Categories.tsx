import React, { ReactElement, useEffect, useRef, useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllCategories } from "./categoriesSlice";

interface Props {}

export function Categories({}: Props): ReactElement {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);

  const [selectedSecondCategory, setSelectedSecondCategory] =
    useState<string>();

  const [selectedThirdCategory, setSelectedThirdCategory] = useState<string>();

  const handleSelectSecondCategory = (id: string) => {
    setSelectedSecondCategory(id);
  };

  const handleSelectThirdCategory = (id: string) => {
    setSelectedThirdCategory(id);
  };

  const secondCategory = categories.find(
    (category) => category.id === selectedSecondCategory
  );

  const thirdCategory = secondCategory?.children.find(
    (category) => category.id === selectedSecondCategory
  );

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  console.log(thirdCategory);

  return (
    <main className="w-full p-4 flex flex-col justify-center items-center dark:bg-gray-600">
      <h1 className="mb-4 text-2xl md:text-4xl dark:text-white dark:font-bold">
        Categories
      </h1>
      <section className=" w-full h-screen md:h-full flex">
        <div className="category-first-depth">
          <p className="text-center font-bold text-lg md:text-xl dark:text-green-600">
            First Depth
          </p>
          <div className="overflow-x-hidden overflow-y-auto h-screen">
            {categories.map((category) => (
              <p
                key={category.id}
                className="animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none  dark:text-green-700"
                onClick={() => handleSelectSecondCategory(category.id)}
              >
                {category.name}
                <IoArrowForward />
              </p>
            ))}
            <p
              className="animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
              // onClick={() => setSelectedThirdCategory()}
            >
              Healthy &amp; Beauty
              <IoArrowForward />
            </p>
            <p
              className="animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
              // onClick={() => setSelectedThirdCategory()}
            >
              Healthy &amp; Beauty
              <IoArrowForward />
            </p>
            <p
              className="animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
              // onClick={() => setSelectedThirdCategory()}
            >
              Healthy &amp; Beauty
              <IoArrowForward />
            </p>
            <p
              className="animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
              // onClick={() => setSelectedThirdCategory()}
            >
              Healthy &amp; Beauty
              <IoArrowForward />
            </p>
            <p
              className="animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
              // onClick={() => setSelectedThirdCategory()}
            >
              Healthy &amp; Beauty
              <IoArrowForward />
            </p>
            <p
              className="animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
              // onClick={() => setSelectedThirdCategory()}
            >
              Healthy &amp; Beauty
              <IoArrowForward />
            </p>
            <p
              className="animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
              // onClick={() => setSelectedThirdCategory()}
            >
              Healthy &amp; Beauty
              <IoArrowForward />
            </p>
            <p
              className="animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
              // onClick={() => setSelectedThirdCategory()}
            >
              Healthy &amp; Beauty
              <IoArrowForward />
            </p>
            <p
              className="animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
              // onClick={() => setSelectedThirdCategory()}
            >
              Healthy &amp; Beauty
              <IoArrowForward />
            </p>
            <p
              className="animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
              // onClick={() => setSelectedThirdCategory()}
            >
              Healthy &amp; Beauty
              <IoArrowForward />
            </p>
            <p
              className="animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
              // onClick={() => setSelectedThirdCategory()}
            >
              Healthy &amp; Beauty
              <IoArrowForward />
            </p>
          </div>
        </div>
        <div className="category-second-depth ">
          <p className="text-center font-bold text-lg md:text-xl dark:text-green-600">
            Second Depth
          </p>
          <div className="overflow-x-hidden overflow-y-auto h-screen">
            {secondCategory?.children.map((category) => (
              <p
                key={category.id}
                className="animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
                onClick={() => setSelectedThirdCategory(category.id)}
              >
                {category.name}
                <IoArrowForward />
              </p>
            ))}
          </div>
        </div>
        <div className="category-third-depth">
          <p className="text-center font-bold text-lg md:text-xl dark:text-green-600">
            Third Depth
          </p>

          <div className="overflow-x-hidden overflow-y-auto h-screen">
            {secondCategory?.children.map((category) => (
              <p
                key={category.id}
                className="animate-fade-in-down flex justify-between items-center bg-gray-50 py-3 px-4 my-2 rounded-full text-black text-sm md:text-base transform hover:scale-105 focus:bg-gray-800 motion-safe:transform-none transition-all delay-75 ease-in select-none dark:text-green-700"
                onClick={() => setSelectedThirdCategory(category.id)}
              >
                {category.name}
                <IoArrowForward />
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ChildCategory from "../../components/form/ChildCategory";
import ParentCategory from "../../components/form/ParentCategory";
import { getAllCategories } from "./categoriesSlice";
import CategorySkeleton from "./CategorySkeleton";
import FirstDepth from "./FirstDepth";
import SecondDepth from "./SecondDepth";
import ThirdDepth from "./ThirdDepth";

const ButtonGroup: React.FC<{
  handleParentCategoryForm: () => void;
  handleChildCategoryForm: () => void;
}> = ({ handleParentCategoryForm, handleChildCategoryForm }) => {
  return (
    <div className="flex justify-start w-full mb-4 font-bold text-2xl md:text-4xl dark:text-white dark:font-bold">
      <button
        type="button"
        className="btn-add"
        onClick={handleParentCategoryForm}
      >
        Add parent category
      </button>
      <button className="btn-add ml-2" onClick={handleChildCategoryForm}>
        Add child category
      </button>
    </div>
  );
};

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);

  const [selectedSecondCategory, setSelectedSecondCategory] =
    useState<string>();
  const [selectedThirdCategory, setSelectedThirdCategory] = useState<string>();
  const [openParentCategoryForm, setOpenParentCategoryForm] = useState(false);
  const [openChildCategoryForm, setOpenChildCategoryForm] = useState(false);

  const handleSelectSecondCategory = (id: string) => {
    setSelectedSecondCategory(id);
  };
  const handleSelectThirdCategory = (id: string) => {
    setSelectedThirdCategory(id);
  };
  const handleParentCategoryForm = () => {
    setOpenParentCategoryForm(!openParentCategoryForm);
  };
  const handleChildCategoryForm = () => {
    setOpenChildCategoryForm(!openChildCategoryForm);
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
    <main className="main-each-page">
      <ButtonGroup
        handleParentCategoryForm={handleParentCategoryForm}
        handleChildCategoryForm={handleChildCategoryForm}
      />
      <section className="flex w-full h-screen md:h-full">
        <FirstDepth
          categories={categories}
          handleSelectSecondCategory={handleSelectSecondCategory}
        />
        <SecondDepth
          secondCategory={secondCategory}
          handleSelectThirdCategory={handleSelectThirdCategory}
        />
        <ThirdDepth thirdCategory={thirdCategory} />
      </section>
      <ParentCategory
        openParentCategoryForm={openParentCategoryForm}
        handleParentCategoryForm={handleParentCategoryForm}
      />
      <ChildCategory
        openChildCategoryForm={openChildCategoryForm}
        handleChildCategoryForm={handleChildCategoryForm}
      />
    </main>
  );
};

export default Categories;

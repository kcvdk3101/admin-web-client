import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Category } from "../../models";
import CategorySkeleton from "./CategorySkeleton";

interface FirstDepthProps {
  categories: Category[];
  handleSelectSecondCategory: (id: string) => void;
}

const FirstDepth: React.FC<FirstDepthProps> = ({
  categories,
  handleSelectSecondCategory,
}) => {
  const fectchingCategories = useAppSelector(
    (state) => state.categories.fetchingCategories
  );

  return (
    <div className="category-first-depth">
      <p className="px-2 text-center font-bold text-lg md:text-xl dark:text-green-600">
        First Depth
      </p>
      {fectchingCategories ? (
        <CategorySkeleton n={categories.length} />
      ) : (
        <div className="overflow-x-hidden overflow-y-auto h-screen px-3">
          {categories.map((category) => (
            <p
              key={category.id}
              className="category-card motion-safe:transform-none"
              onClick={() => handleSelectSecondCategory(category.id)}
            >
              {category.name}
              <svg
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
      )}
    </div>
  );
};

export default FirstDepth;

import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Category } from "../../models";
import CategorySkeleton from "./CategorySkeleton";

interface FirstDepthProps {
  categories: Category[];
  fectchingCategories: boolean;
  handleSelectSecondCategory: (id: string) => void;
}

const FirstDepth: React.FC<FirstDepthProps> = ({
  categories,
  fectchingCategories,
  handleSelectSecondCategory,
}) => {
  return (
    <div className="category-first-depth">
      <p className="flex-shrink-0 px-1 text-center font-bold text-xs sm:text-base md:text-lg lg:text-xl dark:text-green-600">
        First Depth
      </p>
      {fectchingCategories ? (
        <CategorySkeleton n={categories.length} />
      ) : (
        <div className="flex-1 overflow-x-hidden overflow-y-auto h-screen px-0 sm:px-1 md:px-2 lg:px-3">
          {categories.map((category) => (
            <p
              key={category.id}
              className="category-card motion-safe:transform-none"
              onClick={() => handleSelectSecondCategory(category.id)}
            >
              <p className="flex-1 truncate">{category.name}</p>
              <svg
                className="flex-shrink-0 h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6"
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

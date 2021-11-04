import React from "react";
import { Category } from "../../models";

interface SecondDepthProps {
  secondCategory: Category | undefined;
  handleSelectThirdCategory: (id: string) => void;
}

const SecondDepth: React.FC<SecondDepthProps> = ({
  secondCategory,
  handleSelectThirdCategory,
}) => {
  return (
    <div className="category-second-depth">
      <p className="px-2 text-center font-bold text-lg md:text-xl dark:text-green-600">
        Second Depth
      </p>
      <div className="overflow-x-hidden overflow-y-auto h-screen px-3">
        {secondCategory?.children?.map((category) => (
          <p
            key={category.id}
            className="category-card motion-safe:transform-none"
            onClick={() => handleSelectThirdCategory(category.id)}
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
    </div>
  );
};

export default SecondDepth;

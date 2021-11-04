import React from "react";
import { ChilrenCategory } from "../../models";

interface ThirdDepthProps {
  thirdCategory: ChilrenCategory | undefined;
}

const ThirdDepth: React.FC<ThirdDepthProps> = ({ thirdCategory }) => {
  return (
    <div className="category-third-depth">
      <p className="text-center font-bold text-lg md:text-xl dark:text-green-600">
        Third Depth
      </p>
      <div className="overflow-x-hidden overflow-y-auto h-screen px-3">
        {thirdCategory?.children?.map((category) => (
          <p
            key={category.id}
            className="category-card motion-safe:transform-none"
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

export default ThirdDepth;

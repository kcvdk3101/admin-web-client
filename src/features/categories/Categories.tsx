import React, { ReactElement } from "react";

interface Props {}

export function Categories({}: Props): ReactElement {
  return (
    <div className="w-full p-4 flex flex-col justify-center items-center">
      <h1 className="mb-auto text-2xl md:text-4xl">Categories</h1>
      <div className="border border-red-600 w-full h-screen md:h-full"></div>
    </div>
  );
}

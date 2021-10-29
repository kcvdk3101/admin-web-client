import React from "react";

interface ButtonsActionProps {
  cols: number;
  title: string;
  handleAction: () => void;
}

const ButtonsAction: React.FC<ButtonsActionProps> = ({
  cols,
  title,
  handleAction,
}) => {
  return (
    <div className={`col-span-${cols} ml-auto`}>
      <button
        className="bg-transparent text-gray-500 font-bold uppercase text-xs px-3 py-2 hover:shadow-md outline-none ease-linear transition-all duration-150 dark:bg-gray-50"
        type="button"
        onClick={handleAction}
      >
        Close
      </button>
      <button
        className="bg-blue-500 font-bold uppercase text-sm px-4 py-2 ml-2 rounded shadow hover:shadow-md outline-none ease-linear transition-all duration-150 text-white dark:bg-white dark:text-green-500 dark:hover:text-green-600"
        type="submit"
      >
        {title}
      </button>
    </div>
  );
};

export default ButtonsAction;

import React, { useState } from "react";
import { typesOfCoupon } from "../../constant";

interface NewCouponProps {
  handleOpenCouponForm: () => void;
}

const NewCoupon: React.FC<NewCouponProps> = ({ handleOpenCouponForm }) => {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [image, setImage] = useState<undefined | unknown | any>();
  const [imagePreview, setImagePreview] = useState<
    string | undefined | null | ArrayBuffer
  >();
  const [helpText, setHelpText] = useState({ helperText: "", error: false });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      setName(event.target.value.trim());
      setHelpText({ helperText: "", error: false });
    } else {
      setName("");
      setHelpText({ helperText: "Invalid format", error: true });
    }
  };

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let fileElement: any = event.target.files;

    if (!fileElement || fileElement.length === 0) return;
    const files = Array.from(fileElement);
    setImage(undefined);
    setImagePreview(undefined);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState !== 2) return;
        setImage(fileElement[0]);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file as any);
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === "") {
      setName("");
      setHelpText({ helperText: "Invalid format", error: true });
      return;
    }

    // handleFirstCategoryForm();
    // toast.success(`Add ${name} success`);

    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("files", image);

    // try {
    //   await addParentCategory(formData);
    // } catch (error) {
    //   toast.error(error as any);
    // }
  };

  return (
    <div className="relative my-6 mx-auto max-w-3xl w-1/2">
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <h3 className="text-xl md:text-2xl font-semibold p-5">Coupon Form</h3>
        <div className="border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
          <form className="relative p-6 flex-auto" onSubmit={handleSubmit}>
            <div className="flex mb-4">
              <div className="flex-1 flex flex-col">
                <label
                  className={` mb-2 text-base text-gray-900`}
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className={`${
                    helpText.error && "border-red-500"
                  } border py-2 px-3 text-grey-800 outline-none`}
                  type="text"
                  name="name"
                  id="name"
                  onChange={onChange}
                />
                <p className="text-red-500">
                  {helpText.helperText && helpText.helperText}
                </p>
              </div>
              <div className="ml-2 flex-1 flex flex-col">
                <label
                  className={` mb-2 text-base text-gray-900`}
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  className={`${
                    helpText.error && "border-red-500"
                  } border py-2 px-3 text-grey-800 outline-none`}
                  type="text"
                  name="description"
                  id="description"
                  onChange={onChange}
                />
                <p className="text-red-500">
                  {helpText.helperText && helpText.helperText}
                </p>
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <span className="mb-2 text-base text-gray-900">
                Type of coupon
              </span>
              {["percentage", "cash"].map((type, index) => (
                <div key={index}>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="radio"
                      value={type}
                      checked
                    />
                    <span className="capitalize ml-2">{type}</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="date" className="mb-2 text-base text-gray-900">
                Start event
              </label>
              <input
                type="date"
                id="date"
                name="date"
                placeholder="date"
                className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="date" className="mb-2 text-base text-gray-900">
                End event
              </label>
              <input
                type="date"
                id="date"
                name="date"
                placeholder="date"
                className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
              />
            </div>

            <div className="flex flex-col mb-4">
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: "none" }}
                required
                onChange={onChangeImage}
              />
              {imagePreview !== undefined ? (
                <label
                  htmlFor="contained-button-file"
                  className="cursor-pointer"
                >
                  <img
                    src={imagePreview as string}
                    alt="Image"
                    className="h-32 w-32 shadow-md"
                  />
                </label>
              ) : (
                <label
                  htmlFor="contained-button-file"
                  className="w-40 flex justify-start items-center text-base text-gray-900 cursor-pointer"
                >
                  Choose image
                  <svg
                    className="h-10 w-10 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              )}
            </div>
            <div className="flex items-center justify-end">
              <button
                className="bg-transparent text-gray-500 font-bold uppercase text-xs px-4 outline-none ease-linear transition-all duration-150 dark:bg-white "
                type="button"
                onClick={handleOpenCouponForm}
              >
                Close
              </button>
              <button
                className="bg-blue-500 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none ease-linear transition-all duration-150 text-white dark:bg-white dark:text-green-500 dark:hover:text-green-600"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCoupon;

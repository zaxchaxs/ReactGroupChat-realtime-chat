/* eslint-disable react/prop-types */
export default function ButtonAuth({ icon, val, handleClickButton, isLoggin }) {
  return (
    <div
      className={`cursor-pointer w-fit p-1 rounded-lg text-white font-bold text-center ${
        isLoggin ? "bg-sky-700" : "bg-sky-500"
      } shadow-md hover:scale-105 transition-all ease-in-out duration-200 active:scale-100 flex items-center justify-center px-3`}
      onClick={handleClickButton}
    >
      <img
        className={`w-5 ${isLoggin ? "hidden" : ""}`}
        src={icon}
        alt={"icon"}
      />
      <p className="p-2 px-3">{val}</p>
    </div>
  );
}

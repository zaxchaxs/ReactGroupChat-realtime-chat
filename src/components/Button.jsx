/* eslint-disable react/prop-types */
export default function Button({ isBtnLoggin, val, route, handleClick, isHidden }) {
  return (
    <div
      className={`cursor-pointer w-fit rounded-lg text-white font-bold text-center ${
        isHidden ? "hidden" : ""} ${isBtnLoggin ? "bg-sky-700" : "bg-sky-500"} shadow-md hover:scale-105 transition-all ease-in-out duration-200 active:scale-100 flex items-center px-2`}
      onClick={handleClick}>
      <a href={route} className="p-2 px-2">{val}</a>
    </div>
  );
}

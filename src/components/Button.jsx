/* eslint-disable react/prop-types */
export default function Button({ isBtnLoggin, val, route, handleClick, isHidden }) {
    return (
      <div className={`cursor-pointer w-fit p-1.5 rounded-lg text-white font-bold text-center ${isHidden ? "hidden" : ""} ${isBtnLoggin ? "bg-sky-700" : "bg-sky-500"} shadow-md hover:scale-105 transition-all ease-in-out duration-200 active:scale-100`} onClick={handleClick}>
        <a href={route} className="p-2 px-3">{val}</a>
      </div>
    );
}
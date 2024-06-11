/* eslint-disable react/prop-types */
import closeIcon from "/icons/close-icon.svg";


export default function ModalInfoGroup({isShowed}) {
    return (
        <div className={`${isShowed ? "" : "hidden"} absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-600 rounded-lg shadow-lg p-4`}>
            <div className="font-bold text-lg md:text-xl p-2 text-white flex gap-2 justify-between border-b-2">
                <h1>Info Group</h1>
                <button>
                    <img src={closeIcon} alt="close-icon" className="w-7"  />
                </button>
            </div>
        </div>
    )
}
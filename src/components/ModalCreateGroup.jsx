import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

/* eslint-disable react/prop-types */
export default function ModalGroup({ isShowed, onSubmit, onModalClose }) {
    const { user } = useAuth();
    const [groupName, setGroupName] = useState("");

    const newData = {
        name: groupName,
        created_at: new Date(),
        created_by: user.displayName
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newData);
        setGroupName("");
    }


  return (
    // <div className={`${isShowed ? "" : "hidden"} absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-600 rounded-lg shadow-lg p-4 backdrop-blur-md`}>
    <div className={`${isShowed ? "" : "hidden"} absolute z-10 w-full h-screen backdrop-blur-md`}>
      <div
        className={`absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-600 rounded-lg shadow-lg p-4 `}
      >
        <div className="font-bold text-xl p-2 px-4 text-white flex justify-between items-center gap-4 border-b-2">
          <h1>Create New Group</h1>
          <button
            onClick={onModalClose}
            className="p-1 px-3 bg-blue-400 rounded-md mt-2 hover:bg-blue-500 hover:scale-105 transition-all ease-in-out duration-200 text-white font-bold"
          >
            &times;
          </button>
        </div>
        <div className="p-2">
          <h1 className="p-2 text-white font-bold">Group name: </h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className="p-1 rounded-lg"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group name..."
            ></input>
          </form>
        </div>
        <div className="p-4">
          <ModalBtn value={"Set Icon"} />
          {/* icon sec */}
        </div>
        <div className="flex gap-2 justify-end border-t-2">
            <ModalBtn value={"Close"} handleClose={onModalClose} />
            <ModalBtn value={"Submit"} handleSubmit={handleSubmit} />

        </div >
      </div>
    </div>
  );
}


function ModalBtn({value, handleSubmit, handleClose}) {
    return (
        <button
            className="p-1 px-3 hover:bg-blue-500 hover:scale-105 transition-all ease-in-out duration-200 bg-blue-400 rounded-md mt-2 text-white font-bold"
            onClick={handleSubmit ? handleSubmit : handleClose}
        >
        {value}
        </button>
    )
}
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import closeIcon from "/icons/close-icon.svg";

/* eslint-disable react/prop-types */
export default function ModalGroup({ isShowed, onSubmit, onModalClose }) {
  const { user } = useAuth();
  const [groupName, setGroupName] = useState("");

  const newData = {
    name: groupName,
    created_at: new Date(),
    created_by: user.displayName,
    uid: user.uid,
    photoURL: user.photoURL,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newData.name) {
      alert("Please enter a valid group name");
    } else {
      onSubmit(newData);
      setGroupName("");
    }
  };

  return (
    <div
      className={`${
        isShowed ? "" : "hidden"
      } absolute z-10 w-full h-screen backdrop-blur-md transition-all`}
    >
      <div
        className={`absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-600 rounded-lg shadow-lg p-4 `}
      >
        <div className="font-bold md:text-xl p-2 text-white flex justify-between border-b-2 items-center">
          <h1>Create Group</h1>
          <button onClick={onModalClose}>
            <img src={closeIcon} alt="close-icon" className="w-7" />
          </button>
        </div>
        <div className="p-2">
          <h1 className="p-2 text-white font-bold">Group name: </h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className="p-1 rounded-lg focus:outline-none"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group name..."
            ></input>
          </form>
        </div>
        <div className="flex gap-2 justify-between border-t-2">
          <ModalBtn value={"Submit"} handleSubmit={handleSubmit} />
          <ModalBtn value={"Close"} handleClose={onModalClose} />
        </div>
      </div>
    </div>
  );
}

// Child components
function ModalBtn({ value, handleSubmit, handleClose }) {
  return (
    <button
      className="p-1 px-3 hover:bg-blue-600 transition-all ease-in-out duration-200 bg-blue-400 rounded-md mt-2 text-white font-bold"
      onClick={handleSubmit ? handleSubmit : handleClose}
    >
      {value}
    </button>
  );
}

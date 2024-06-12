/* eslint-disable react/prop-types */
import { collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore";
import closeIcon from "/icons/close-icon.svg";
import updateICon from "/icons/edit-icon.svg";
import deleteIcon from "/icons/trash-icon.svg";
import { db } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useAuth } from "../contexts/AuthContext";

export default function ModalInfoGroup({ isShowed, onCloseClick, datas }) {
  const [loading, setLoading] = useState(false);
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // handler functions
  const handleDeleteClick = async () => {
    try {
      setLoading(true);
      await deleteGroup();
      await deleteMessage();
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
      onCloseClick();
      navigate("/chat-homepage");
    }
  };
  const handleUpdateClick = () => {
    onCloseClick();
    setIsShowUpdateModal(!isShowUpdateModal);
  };

  const deleteGroup = async () => {
    const qGroup = query(doc(db, `groups/${datas.id}`));
    await deleteDoc(qGroup);
  };

  // also deleting the message of the group
  const deleteMessage = async () => {
    const qMessage = query(collection(db, `messages/${datas.id}/message`));
    const docSnap = await getDocs(qMessage);
    if (!docSnap.empty) {
      docSnap.docs.map(async (e) => {
        await deleteDoc(doc(db, `messages/${datas.id}/message/${e.id}`));
      });
    }
  };

  const convertTimestampToTime = (seconds, nanoseconds) => {
    const milliseconds = seconds * 1000 + nanoseconds / 1e6;
    const date = new Date(milliseconds);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("id-ID", options);
  };

  const createdAt = convertTimestampToTime(
    datas.created_at.seconds,
    datas.created_at.nanoseconds
  );

  return isShowUpdateModal ? (
    <ModalUpdateGroup onModalClose={handleUpdateClick} data={datas} />
  ) : (
    <div
      className={`${
        isShowed ? "" : "hidden"
      } absolute z-10 backdrop-blur-md w-full h-full transition-all duration-200 ease-in-out top-0`}
    >
      <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-600 rounded-lg shadow-lg p-4 md:w-3/6 lg:w-1/3 w-3/4">
        <div className="font-bold text-lg md:text-xl p-2 text-white flex gap-2 justify-between border-b-2">
          <h1 className="pr-8">Group Info</h1>
          <button onClick={onCloseClick}>
            <img src={closeIcon} alt="close-icon" className="w-6" />
          </button>
        </div>
        <div className="text-base md:text-lg lg:text-xl p-2 text-white flex">
          <table className="w-full">
            <thead className="w-full text-left">
              <tr>
                <th className="w-1/2 md:w-1/3 ">Group Name</th>
                <th>:</th>
                <th className=" w-full font-semibold">{datas.name}</th>
              </tr>
              <tr>
                <th className="w-1/2 md:w-1/3 ">Created By</th>
                <th>:</th>
                <th className=" w-full font-semibold">{datas.created_by}</th>
              </tr>
              <tr>
                <th>Created At</th>
                <th>:</th>
                <th className="font-semibold">{createdAt}</th>
              </tr>
              <tr className={datas.updated_at ? "" : "hidden"}>
                <th>Updated At</th>
                <th>:</th>
                <th className="font-semibold">{createdAt}</th>
              </tr>
            </thead>
          </table>
        </div>

        {user.uid === datas.uid ? (
          <div className="w-full flex justify-between p-2 py-3">
            <button onClick={handleUpdateClick}>
              <img className="w-6" src={updateICon} alt="update" />
            </button>
            <div className={loading ? "" : "hidden"}>
              <Loader isSmallLoad={true} />
            </div>
            <button
              className={loading ? "hidden" : ""}
              onClick={handleDeleteClick}
            >
              <img className="w-6" src={deleteIcon} alt="delete" />
            </button>
          </div>
        ) : (
          <div className="w-full flex justify-end p-2 py-3 font-bold text-lg">
            <button
              className="bg-white rounded-lg p-1.5 px-3 text-sky-600"
              onClick={onCloseClick}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Child Component
function ModalUpdateGroup({ onModalClose, data }) {
  const [groupName, setGroupName] = useState("");

  const newData = {
    name: groupName,
    updated_at: new Date()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!newData.name) {
        alert("Please enter a valid group name");
      } else {
        setGroupName("");
        const q = query(doc(db, `groups/${data.id}`));
        await updateDoc(q, newData);
        onModalClose();
      }
    } catch(e) {
      console.error(e.message);
    }
  };

  return (
    <div
      className={`absolute top-0 z-10 w-full h-screen backdrop-blur-md transition-all`}
    >
      <div
        className={`absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-600 rounded-lg shadow-lg p-4 `}
      >
        <div className="font-bold md:text-xl p-2 text-white flex justify-between border-b-2 items-center">
          <h1>Update Group</h1>
          <button onClick={onModalClose}>
            <img src={closeIcon} alt="close-icon" className="w-7" />
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

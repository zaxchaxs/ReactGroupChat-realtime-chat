/* eslint-disable react/prop-types */
import { collection, deleteDoc, doc, query } from "firebase/firestore";
import closeIcon from "/icons/close-icon.svg";
import updateICon from "/icons/edit-icon.svg"
import deleteIcon from "/icons/trash-icon.svg"
import { db } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ModalInfoGroup({isShowed, onCloseClick, datas}) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // handler functions
    const handleDeleteClick = () => {
        try {
            setLoading(true);
            deleteGroup();
            deleteMessage();
            } catch(e) {
                console.error(e.message);
        } finally{
            setLoading(false);
            onCloseClick();
            navigate("/chat-homepage");
        }
    };

    const deleteGroup = async () => {
        const qGroup = query(doc(db, `groups/${datas.id}`))
        await deleteDoc(qGroup);
    };

    const deleteMessage = async () => {
        const qMessage = query(collection(db, `messages/${datas.id}/message`));
        await deleteDoc(qMessage);
    }

    const convertTimestampToTime = (seconds, nanoseconds) => {
        const milliseconds = (seconds * 1000) + (nanoseconds / 1e6);
        const date = new Date(milliseconds);

        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
        };

        return date.toLocaleDateString('id-ID', options);
    };

    const createdAt = convertTimestampToTime(datas.created_at.seconds, datas.created_at.nanoseconds);

    return (
      <div
        className={`${
          isShowed ? "" : "hidden"
        } absolute z-10 backdrop-blur-md w-full h-full transition-all duration-200 ease-in-out top-0`}
      >
        <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-600 rounded-lg shadow-lg p-4 md:w-1/3 w-3/4">
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
                  <th className="w-1/2 md:w-1/3 ">Created By:</th>
                  <th className=" w-full font-semibold">{datas.created_by}</th>
                </tr>
                <tr>
                  <th>Created At:</th>
                  <th className="font-semibold">{createdAt}</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="w-full flex justify-between p-2 py-3">
            <button>
              <img className="w-6" src={updateICon} alt="update" />
            </button>
            <button onClick={handleDeleteClick}>
              <img className="w-6" src={deleteIcon} alt="delete" />
            </button>
          </div>
        </div>
      </div>
    );
}
import { useState } from "react";
import { Authentication } from "../firebase";
import { auth } from "../firebase";
/* eslint-disable react/prop-types */
export default function ModalGroup({ isShowed }) {
    const { displayName } = auth.currentUser

    const [groupName, setGroupName] = useState("");

    const newData = {
        name: groupName,
        created_at: new Date(),
        created_by: displayName
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newData)
    }


  return (
    // <div className={`${isShowed ? "" : "hidden"} absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-600 rounded-lg shadow-lg p-4 backdrop-blur-md`}>
    <div className={`${isShowed ? "" : "hidden"} absolute z-10 w-full border-2 border-black h-screen backdrop-blur-md`} >
        <div className={`absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-600 rounded-lg shadow-lg p-4`}>
            <h1>Group name: </h1>
            <form onSubmit={e => handleSubmit(e)}>
                <input className="p-1 rounded-lg" type="text" value={groupName} onChange={e => setGroupName(e.target.value)} placeholder="Group name..."></input>
            </form>
        </div>
    </div>
  );
}

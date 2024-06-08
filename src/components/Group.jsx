/* eslint-disable react/prop-types */
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { Link } from "react-router-dom"
import { db } from "../firebase"
import { useEffect, useState } from "react";

export default function Group({ data, getGroupId }) {
  const [lastMessage, setLastMessage] = useState("");
  const [lengthMessage, setLengtMessage] = useState(35);

  const trimLastMessage = (data) => {
    if(!data) {
        const message = "Start conversation in this group."
        setLastMessage(message);
    } else {
        let message = `${data.created_by}: ${data.message}`;
        message = message.length > 35 ? `${message.slice(0, lengthMessage)}...` : message;
        setLastMessage(message);
    }
  }

//   resolution setting for lengthMessage
  useEffect(() => {

  },[])

  useEffect(() => {
    const q = query(
      collection(db, `messages/${data.id}/message`),
      orderBy("created_at", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        ...doc.data(),
      }));
      const message = messages[messages.length-1];
      trimLastMessage(message? message : "" );
    });
  }, [data]);

  return (
    <Link
      to={`/chat-page?groupId=${data.id}`}
      onClick={() => getGroupId(data.id)}
    >
      <div
        className={`w-full p-4 text-left text-slate-200 rounded-md bg-sky-600 border-y-2 border-sky-600"} hover:scale-105 duration-200 transition-all ease-in-out flex items-center gap-4`}
      >
        <img
          className="rounded-full w-12"
          src={data.photoURL}
          alt={data.created_by}
        />
        <div>
          <h1 className="text-xl font-bold">{data.name}</h1>
          <p className="text-[15px]">{lastMessage}</p>
        </div>
      </div>
    </Link>
  );

  // return data.map((group, i) => {
  //     return <Link to={`/chat-page?groupId=${group.id}`} onClick={() => getGroupId(group.id)} key={i} >
  //         <div className={`w-full p-4 text-left text-slate-200 rounded-md ${i % 2 == 0 ? "bg-sky-600" : "border-y-2 border-sky-600"} hover:scale-105 duration-200 transition-all ease-in-out flex items-center gap-4`}>
  //             <img className="rounded-full w-12" src={group.photoURL} alt={group.created_by} />
  //             <div>
  //                 <h1 className="text-xl font-bold">{group.name}</h1>
  //                 <p>{group.created_by}</p>
  //             </div>
  //         </div>
  //     </Link>
  // })
}
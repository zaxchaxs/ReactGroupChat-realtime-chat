/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useRef, useState } from "react";

export default function Group({ data, getGroupId, index }) {
  const [lastMessage, setLastMessage] = useState("");
  const [lengthMessage, setLengtMessage] = useState(35);
  const lengthMessageRef = useRef();

    //   resolution setting for lengthMessage
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1280) {
          setLengtMessage(45);
          lengthMessageRef.current = 45;
        } else if (window.innerWidth >= 1020) {
          setLengtMessage(35);
          lengthMessageRef.current = 35;
        } else if (window.innerWidth >= 768) {
          setLengtMessage(30);
          lengthMessageRef.current = 30;
        }
      }
  
      handleResize();
    }, []);
    
    useEffect(() => {
      try {
        const q = query(
          collection(db, `messages/${data.id}/message`),
          orderBy("created_at", "asc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const messages = snapshot.docs.map((doc) => ({
            ...doc.data(),
            }));
          const message = messages[messages.length - 1];
  
          trimLastMessage(message ? message : "");
        });
      } catch(e) {
        console.error(e.message);
      }
    }, [data]);

  const trimLastMessage = (data) => {
    if (!data) {
      const message = "Start conversation in this group.";
      setLastMessage(message);
    } else {
      let message = `${data.created_by}: ${data.message}`;
      const currLength = lengthMessageRef.current;
      message = message.length > lengthMessage ? `${message.slice(0, currLength || lengthMessage)}...` : message;
      setLastMessage(message);
    }
  };


  return (
    <Link
      to={`/chat-page?groupId=${data.id}`}
      onClick={() => getGroupId(data.id)}
    >
      <div
        className={`w-full p-4 text-left text-slate-200 rounded-md ${
          index % 2 == 0 ? "bg-sky-600" : "border-y-2 border-sky-600"
        } hover:scale-105 duration-200 transition-all ease-in-out flex items-center gap-4`}
      >
        <img
          className="rounded-full w-12"
          src={data.photoURL}
          alt={data.created_by}
        />
        <div>
          <h1 className="text-base md:text-base font-bold">{data.name}</h1>
          <p className="text-[13px] md:text-sm">{lastMessage}</p>
        </div>
      </div>
    </Link>
  );
}

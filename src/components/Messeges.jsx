/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import Loader from "./Loader";
import { useAuth } from "../contexts/AuthContext";

export default function Messages({ groupId, currId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const scrollRef = useRef(null);

  useEffect(() => {
    try {
      const q = query(
        collection(db, `messages/${groupId ? groupId : currId}/message`),
        orderBy("created_at", "asc")
      );

      // eslint-disable-next-line no-unused-vars
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length != 0) {
          const newMessages = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setMessages(newMessages);
        } else {
          setMessages([]);
        }
      });
    } catch (e) {
      console.error(e.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [groupId]);

  // scrolling when theres a new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (loading && messages.length == 0) {
    return <Loader onMessage={true} />;
  } else if (messages.length != 0) {
    return (
      <div className="w-full h-full flex flex-col gap-4 overflow-x-hidden">
        <Message data={messages} author={user.uid} />
        <span ref={scrollRef}></span>
      </div>
    );
  } else {
    return (
      <div className="w-full items-center h-full flex justify-center ">
        <div className="w-full text-lg text-sky-800 font-bold">
          <h1>It seems empty here. Type some message below.</h1>
        </div>
      </div>
    );
  }
}

// child component
function Message({ data, author }) {
  return data.map((e, i) => {
    return (
      <div
        className={`w-full px-5 flex ${
          e.uid == author
            ? "justify-end pl-20 md:pl-48"
            : "justify-start pr-20 md:pr-48"
        }`}
        key={i}
      >
        <div
          className={`w-fit px-5 p-1 ${
            e.uid == author ? "bg-blue-500" : "bg-blue-400"
          } rounded-xl text-[13px] text-left`}
        >
          <h1 className="font-bold text-blue-950 w-full border-b-2 border-blue-950 p-[3px]">
            {e.created_by}
          </h1>
          <h1 className="p-1 w-fit text-white">{e.message}</h1>
        </div>
      </div>
    );
  });
}

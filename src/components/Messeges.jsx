/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import Loader from "./Loader";
import { useAuth } from "../contexts/AuthContext";

export default function Messages({ groupId, currId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const scrollRef = useRef(null);

  useEffect(() => {
    try {
      setLoading(true);
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
      }, 300);
    }
  }, [groupId]);

  // scrolling when theres a new messages
  useEffect(() => {
    setTimeout(() => {
      if (scrollRef.current ) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 350);
  }, [messages]);

  if (loading) {
    return <Loader onMessage={true} />;
  } else {
    return messages.length == 0 ? (
      <div className="w-full items-center h-full flex justify-center ">
        <div className="w-full text-lg text-sky-800 font-bold">
          <h1>It seems empty here. Type some message below.</h1>
        </div>
      </div>
    ) : (
      <div className="w-full h-full flex flex-col gap-4 overflow-x-hidden">
        <Message data={messages} author={user.uid} />
        <span ref={scrollRef}></span>
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
          e.uid == author ? "justify-end pl-16" : "justify-start pr-16"
        }`}
        key={i}
      >
        <div
          className={`w-fit  px-5 p-1 ${
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

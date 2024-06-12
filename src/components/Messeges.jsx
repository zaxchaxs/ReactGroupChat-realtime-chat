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
      <div className="w-full h-full flex flex-col gap-4 overflow-x-hidden py-4">
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
  const convertTimestampToTime = (seconds, nanoseconds) => {
    const milliseconds = (seconds * 1000) + (nanoseconds/1e6)
    const date = new Date(milliseconds);
    const options = {
      hour: '2-digit', 
      minute: '2-digit', 
    }

    return date.toLocaleTimeString("en-US", options);
  }

  return data.map((e, i) => {
    const timeMessage = convertTimestampToTime(e.created_at.seconds, e.created_at.nanoseconds)
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
            e.uid == author ? "bg-sky-600" : "bg-blue-500 "
          } rounded-xl  text-left text-base relative`}
        >
          <h1 className="font-bold text-blue-950 w-full border-b-2 border-blue-950 p-[3px]">
            {e.created_by}
          </h1>
            <h1 className="text-white p-1 w-full">{e.message}</h1>
            <p className="text-white w-full justify-end flex text-[12px]">{timeMessage}</p>
        </div>
      </div>
    );
  });
}

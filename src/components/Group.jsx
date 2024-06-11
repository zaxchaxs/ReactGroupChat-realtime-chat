/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useEffect, useRef, useState } from "react";
import infoIcon from "/icons/info-icon.svg";
import ModalInfoGroup from "./ModalInfoGroup";

export default function Group({ data, getGroupId, index }) {
  const [lastMessage, setLastMessage] = useState("");
  const [lengthMessage, setLengtMessage] = useState(40);
  const [isShowingInfo, setIsShowingInfo] = useState(false);
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
    };

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
    } catch (e) {
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
      message =
        message.length > lengthMessage
          ? `${message.slice(0, currLength || lengthMessage)}...`
          : message;
      setLastMessage(message);
    }
  };

  const handleClickInfo = () => {
    setIsShowingInfo(!isShowingInfo)
  };

  return (
    <>
      <div
        className={`flex w-full justify-between ${
          index % 2 == 0
            ? "bg-sky-600 hover:bg-sky-500"
            : "border-y-2 border-sky-600 hover:bg-blue-500"
        }`}
      >
        <Link
          to={`/chat-page?groupId=${data.id}`}
          onClick={() => getGroupId(data.id)}
          className={`w-full`}
        >
          <div
            className={`w-full p-4 px-6 text-left text-slate-200 rounded-md duration-200 transition-all ease-in-out flex items-center gap-4 justify-between`}
          >
            <div className="flex items-center gap-3">
              <img
                className="rounded-full w-12"
                src={data.photoURL}
                alt={data.created_by}
              />
              <div>
                <h1 className="text-base md:text-base font-bold">
                  {data.name}
                </h1>
                <p className="text-[13px] md:text-sm">{lastMessage}</p>
              </div>
            </div>
          </div>
        </Link>
        <button
          className="hover:scale-105 transition-all ease-in-out duration-200 px-4"
          onClick={handleClickInfo}
        >
          <img src={infoIcon} alt="infoIcon" className="w-5" />
        </button>
      </div>

      <ModalInfoGroup isShowed={isShowingInfo} />
    </>
  );
}

/* eslint-disable react/prop-types */
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Loader from "./Loader";

export default function Messages({groupId}) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const tempData = [
        {
            created_by: "Marsha",
            message : "Hallo there"
        },
        {
            created_by: "Marsha Aprilia",
            message : "Hi there too"
        },
        {
            created_by: "Marsha",
            message : "Watchu doing?"
        },
        {
            created_by: "Marsha Aprilia",
            message : "Nothing.."
        },
        {
            created_by: "Marsha",
            message : "Nothing what?"
        },
        {
            created_by: "Marsha Aprilia",
            message : "Nothing.. just an accident"
        }
    ];
    
    useEffect(() => {
        try {
            setLoading(true);
            const q = query(collection(db, `messages/${groupId}/message`), orderBy("created_at", "asc"));
            // eslint-disable-next-line no-unused-vars
            const unsubscribe = onSnapshot(q, snapshot => {
                if(snapshot.docs.length != 0) {
                    const newMessages = snapshot.docs.map(doc => ({
                        ...doc.data()
                    }));
                    setMessages(...messages, newMessages);
                } else {
                    setMessages([]);
                }
            });
        } catch(e) {
            console.error(e.message);
        } finally {
            setLoading(false);
        }
    }, [groupId]);
    
    if(loading) {
        return <Loader onMessage={true} />
    } else {
        return messages.length == 0 ?
        <div className="w-full items-center h-full flex justify-center">
            <div className="w-full text-lg text-sky-800 font-bold">
                <h1>
                  It seems empty here. Type some message below.
                </h1>
              </div>
        </div>
        :
        <div className="w-full h-full flex flex-col gap-4 overflow-x-hidden py-5">
            {
                messages.length? <Message data={messages} /> : <Message data={tempData} />
            }
        </div>
    }   
}

// child component
function Message({data}) {
    return(
        data.map((e, i) => {
              return (
                <div
                  className="w-full px-10 flex justify-end"
                  key={i}
                >
                  <div className="w-fit  px-5 p-1 bg-blue-400 rounded-xl text-[13px] text-left">
                    <h1 className="font-bold text-blue-950 w-full border-b-2 border-blue-950 p-[3px]">
                        {e.created_by}
                    </h1>
                    <h1 className="p-1 w-fit text-white">{e.message}</h1>
                  </div>
                </div>
              );
        })
    )
}
/* eslint-disable react/prop-types */
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Loader from "./Loader";

export default function Messages({groupId}) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const testing = [];
    
    useEffect(() => {
        try {
            setLoading(true);
            const q = query(collection(db, "messages", groupId);
            const unsubscribe = onSnapshot(q, snapshot => {
                const newMessages = snapshot.docs.map(doc => ({
                    ...doc.data()
                }));
                setMessages(...messages, newMessages);
            });
        } catch(e) {
            console.error(e.message);
        } finally {
            setLoading(false);
        }
    }, [])
    
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
        <div className="w-full h-full">
            <Message data={messages} />
        </div>
    }   
}

// child component
function Message({data}) {
    return(
        data.map((e, i) => {
            <div key={i}>
                <h1>{e.message}</h1>
                <h1>{e.name}</h1>
            </div>
        })
    )
}
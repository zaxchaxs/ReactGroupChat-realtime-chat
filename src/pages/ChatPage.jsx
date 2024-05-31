/* eslint-disable no-unused-vars */
import { collection, onSnapshot, orderBy, query} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react"
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Groups from "../components/Groups";
import Messages from "../components/Messeges";
import SendMessage from "../components/SendMessage";

export default function ChatPage() {
    const [ groups, setGroups] = useState([]);
    const [ groupId, setGroupId] = useState("");
    const { user, loading: authload} = useAuth();
    // const queryParams = new URLSearchParams(location.search);

    const handleGroupClick = (id) => {
      setGroupId(id);
    }
    
    useEffect( () => {
      const q = query(collection(db, "groups"), orderBy("created_at", "desc"));
        const unsubscribe = onSnapshot(q, snapshot => {
          const newData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setGroups(newData);
        });
        // unsubscribe();
      }, []);

      if(authload || groups.length == 0) {
        return <Loader />
      } else if(!user) {
        return (
          <section
            className={`w-full flex items-center z-20 absolute backdrop-blur-md h-screen justify-center`}
          >
            <div className={`w-full text-2xl font-bold text-gray-800`}>
              <h1>It seems you are not logged in yet, please log in first</h1>
              <div className="flex justify-center p-4">
                <Button val={"Ok"} route={"/"} />
              </div>
            </div>
          </section>
        );
      } else {
        return (
          <section className="w-full flex justify-between relative bg-slate-200">
            <Groups groups={groups} getGroupId={handleGroupClick} />
            <div className="w-full pt-20 relative items-center flex flex-col overflow-y-scroll h-screen ">
              <div className="w-full h-screen overflow-y-hidden mb-20">
                <Messages groupId={groupId} />
              </div>
              <div className="w-full left-0 absolute bottom-0">
                <SendMessage groupId={groupId} />
              </div>
            </div>
          </section>
        );
      }
}
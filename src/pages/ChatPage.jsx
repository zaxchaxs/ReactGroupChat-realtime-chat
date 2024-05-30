/* eslint-disable no-unused-vars */
import { collection, onSnapshot} from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Groups from "../components/Groups";
import Messages from "../components/Messeges";
import SendMessage from "../components/SendMessage";

export default function ChatPage() {
    const [ groups, setGroups] = useState([]);
    const { user, loading: authload} = useAuth();
    const queryParams = new URLSearchParams(location.search);
    const groupId = queryParams.get("groupId");

    useEffect( () => {
        const unsubscribe = onSnapshot(collection(db, "groups"), (snapshot) => {
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
          <section className="w-full flex justify-between relative">
            <Groups groups={groups} />
            <div className="w-full pt-20 bg-gray-300 relative items-center flex flex-col overflow-y-scroll h-screen ">
              <div className="w-full h-screen overflow-y-scroll mb-20">
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
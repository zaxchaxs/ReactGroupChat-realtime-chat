/* eslint-disable no-unused-vars */
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Groups from "../components/Groups";

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
        return(
            <section className="w-full flex justify-between relative">
                <Groups groups={groups} />
                <div className="w-full pt-20 bg-gray-300 relative  items-center overflow-y-scroll h-screen">
                    <form className="fixed flex w-full bottom-0 p-4 bg-gray-400 rounded-t-xl gap-4">
                        <input type="text" className="w-full p-2 rounded-lg" placeholder="Type a message"></input>
                        <button className="p-1 px-3 bg-blue-500 rounded-md font-bold text-white hover:scale-105 transition-all ease-in-out duration-200">Send</button>
                    </form>

                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quam aliquam aspernatur! Cum saepe animi error facilis.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quam aliquam aspernatur! Cum saepe animi error facilis.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quam aliquam aspernatur! Cum saepe animi error facilis.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quam aliquam aspernatur! Cum saepe animi error facilis.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quam aliquam aspernatur! Cum saepe animi error facilis.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quam aliquam aspernatur! Cum saepe animi error facilis.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quam aliquam aspernatur! Cum saepe animi error facilis.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quam aliquam aspernatur! Cum saepe animi error facilis.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quam aliquam aspernatur! Cum saepe animi error facilis.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quam aliquam aspernatur! Cum saepe animi error facilis.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quam aliquam aspernatur! Cum saepe animi error facilis.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quam aliquam aspernatur! Cum saepe animi error facilis.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quam aliquam aspernatur! Cum saepe animi error facilis.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quam aliquam aspernatur! Cum saepe animi error facilis.</h1>
                    <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos sint eaque, distinctio, possimus dicta corrupti animi nihil qui expedita adipisci, reiciendis nulla quasm aliquam aspernatur! Cum saepe animi error facilis.</h1>
                </div>
            </section>
        )
      }
}
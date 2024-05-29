import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Authentication } from "../firebase";
import { addDoc, getDocs, getDoc, query, collection, where, setDoc, doc, onSnapshot } from "firebase/firestore";
import Group from "../components/Group";
import ModalGroup from "../components/ModalCreateGroup";

export default function ChatHomePage() {
    const { user, auth, db } = Authentication();
    const [groups, setGroups] = useState([]);
    const [isModalShow, setModalShow] = useState(false);

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
    

    // handleFunctions
    const handleCreateGroup = async () => {
      setModalShow(true);
        // try {
        //   addDoc(collection(db, "groups"), {
            
        //   });
        // } catch(e) {
        //   console.error(e.message);
        // }
      };


    return (
      <>
        {/* Validation if user isn't logged */}
        <section
          className={`w-full flex items-center absolute z-0 backdrop-blur-md h-screen justify-center ${
            !user ? "" : "hidden"
          }`}
        >
          <div className={`w-full text-2xl font-bold text-gray-800`}>
            <h1>It seems you are not logged in yet, please log in first</h1>
            <div className="flex justify-center p-4">
              <Button val={"Ok"} route={"/"} />
            </div>
          </div>
        </section>

        <section className={`w-full flex justify-between relative `}>
          <ModalGroup isShowed={isModalShow} />
          <div className="bg-blue-400 w-2/4 h-screen overflow-y-scroll pt-20 ">
            <div className="w-full h-ful items-center">
              <CreateGrupBtn onCreateGroupClick={handleCreateGroup} />
              {/* <Button val={"Test"} handleClick={testingClick} /> */}
              {groups.length == 0 ? (
                <div className={`border-2 border-black`}>
                  <h1 className="font-bold text-sky-900">
                    There no groups yet, create one.
                  </h1>
                </div>
              ) : (
                <Group data={groups} />
              )}
            </div>
          </div>

          <div className="w-full flex items-center text-center m-2">
            <div className="w-full text-lg text-sky-800 font-bold">
              <h1>
                Start chit chat by creating your own group or join to your
                friend group.
              </h1>
            </div>
          </div>
        </section>
      </>
    );
}

// child component
function CreateGrupBtn({onCreateGroupClick}) {
  return (
    <div className="p-4 font-bold text-slate-100 hover:scale-105 transition-all ease-in-out duration-200 active:scale-100" onClick={onCreateGroupClick}>
      <button className="p-2 px-4 rounded-lg bg-sky-600">Create Group</button>
    </div>
  )
}
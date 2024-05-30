/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import Group from "../components/Group";
import ModalGroup from "../components/ModalCreateGroup";
import { useAuth } from "../contexts/AuthContext";
import { auth, db} from "../firebase";
import Loader from "../components/Loader";

export default function ChatHomePage() {
    const { loading: authLoad } = useAuth();
    const [groups, setGroups] = useState([]);
    const [isModalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const handleCloseModal = () => {
      setModalShow(false);
    }
  
    const createGroupHandle = (newData) => {
      try {
        addDoc(collection(db, "groups"), newData);
      } catch(e) {
        console.error(e.message);
      }
      setModalShow(false);
    }


    if(!auth) {
      return(
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
      )
    } else if (authLoad) {
      return <Loader />
    } else {
      return (
          <section className={`w-full flex justify-between relative `}>
            <ModalGroup isShowed={isModalShow} onSubmit={createGroupHandle} onModalClose={handleCloseModal} />
            <div className="bg-blue-400 w-2/4 h-screen overflow-y-scroll pt-20 ">
              <div className="w-full h-ful items-center">
                <CreateGrupBtn onCreateGroupClick={() => setModalShow(true)} />
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
      );
    }
}

// child component
function CreateGrupBtn({onCreateGroupClick}) {
  return (
    <div onClick={onCreateGroupClick} className="p-4 font-bold text-slate-100 hover:scale-105 transition-all ease-in-out duration-200 active:scale-100">
      <button className="p-2 px-4 rounded-lg bg-sky-600">Create Group</button>
    </div>
  )
}
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import Loader from "../components/Loader";
import Groups from "../components/Groups";

export default function ChatHomePage() {
    const { user, loading: authLoad } = useAuth();
    const [groups, setGroups] = useState([]);

    useEffect( () => {
      // eslint-disable-next-line no-unused-vars
      const unsubscribe = onSnapshot(collection(db, "groups"), (snapshot) => {
        const newData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGroups(newData);
      });
      // unsubscribe();
    }, []);
    
    if (authLoad || groups.length == 0) {
      return <Loader />
    } else if(!user) {
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
    } else {
      return (
          <section className={`w-full flex justify-between relative bg-gray-300`}>

            <Groups groups={groups} />  
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
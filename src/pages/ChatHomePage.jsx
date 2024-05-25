import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Authentication } from "../firebase";
import { addDoc, getDocs, getDoc, collection, setDoc, doc } from "firebase/firestore";

export default function Chat() {
    const { user, auth, db } = Authentication();
    const [groups, setGroups] = useState([]);
    
    const fetchData = async () => {
      try {
          const querySnapshot = await getDocs(collection(db, "users"));
          // setGroups(querySnapshot);
          // console.log(groups);
          querySnapshot.forEach(doc => setGroups([...groups, doc.data()]));
          console.log(groups);
      } catch (e) {
        console.error(e.message);
      }
    }
    const testingClick = async () => {
      const citiesRef = collection(db, "cities");
      try {
        const docRef = doc(db, "cities", "SZ");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        // await setDoc(doc(citiesRef, "SF"), {
        //     name: "San Francisco", state: "CA", country: "USA",
        //     capital: false, population: 860000,
        //     regions: ["west_coast", "norcal"] });
        // await setDoc(doc(citiesRef, "LA"), {
        //     name: "Los Angeles", state: "CA", country: "USA",
        //     capital: false, population: 3900000,
        //     regions: ["west_coast", "socal"] });
        // await setDoc(doc(citiesRef, "DC"), {
        //     name: "Washington, D.C.", state: null, country: "USA",
        //     capital: true, population: 680000,
        //     regions: ["east_coast"] });
        // await setDoc(doc(citiesRef, "TOK"), {
        //     name: "Tokyo", state: null, country: "Japan",
        //     capital: true, population: 9000000,
        //     regions: ["kanto", "honshu"] });
        // await setDoc(doc(citiesRef, "BJ"), {
        //     name: "Beijing", state: null, country: "China",
        //     capital: true, population: 21500000,
        //     regions: ["jingjinji", "hebei"] });
          } catch(e) {
            console.error(e.message);
          }
      };


    return (
      <>
        {/* Validation if user isnt logged */}
        <section className={`w-full flex items-center absolute z-0 backdrop-blur-md h-screen justify-center ${ !user ? "" : "hidden"}`}>
          <div className={`w-full text-2xl font-bold text-gray-800`}>
            <h1>It seems you are not logged in yet, please log in first</h1>
            <div className="flex justify-center p-4">
              <Button val={"Ok"} route={"/"} />
            </div>
          </div>
        </section>

        <section className="w-full flex justify-between">
          <div className="bg-blue-400 w-1/4 h-screen overflow-y-scroll pt-20">
              <div className="w-full p-4 h-full border-2 border-black items-center">
                <CreateGrupBtn onCreateGroupClick={fetchData}  />
                <Button val={"Test"} handleClick={testingClick} />
                <div className={``}>
                  <h1 className="font-bold text-sky-900">There no groups yet, create one.</h1>
                </div>
              </div>
          </div>

          <div className="w-full flex items-center text-center m-2">
            <div className="w-full text-lg text-sky-800 font-bold">
              <h1>
                Start chit chat by creating your own group or join to your friend
                group.
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
import Button from "../components/Button";
import { Authentication } from "../firebase";
import { addDoc, getDocs, collection } from "firebase/firestore";

export default function Chat() {
    const { user, auth,  } = Authentication();
    

    return (
      <>
        <section className={`w-full flex items-center absolute z-0 backdrop-blur-md h-screen justify-center ${ !user ? "" : "hidden"}`}>
          <div className={`w-full text-2xl font-bold text-gray-800`}>
            <h1>It seems you are not logged in yet, please log in first</h1>
            <div className="flex justify-center p-4">
              <Button val={"Ok"} route={"/"} />
            </div>
          </div>
        </section>

        <section className="w-full flex justify-between">
          <div className="bg-blue-400 w-1/4 h-screen p-2 overflow-y-scroll">
              <div className="pt-20">
                <CreateGrupBtn />
                <div>
                  <h1 className="text-xl">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt,
                      deleniti dolorum enim maxime modi deserunt iure, eos blanditiis
                      voluptates omnis ipsa alias unde nam autem voluptas laborum quae
                      quos dolore.
                  </h1>
                  <h1 className="text-xl">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt,
                      deleniti dolorum enim maxime modi deserunt iure, eos blanditiis
                      voluptates omnis ipsa alias unde nam autem voluptas laborum quae
                      quos dolore.
                  </h1>
                  <h1 className="text-xl">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt,
                      deleniti dolorum enim maxime modi deserunt iure, eos blanditiis
                      voluptates omnis ipsa alias unde nam autem voluptas laborum quae
                      quos dolore.
                  </h1>
                  <h1 className="text-xl">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt,
                      deleniti dolorum enim maxime modi deserunt iure, eos blanditiis
                      voluptates omnis ipsa alias unde nam autem voluptas laborum quae
                      quos dolore.
                  </h1>
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
function CreateGrupBtn() {
  return (
    <div className="p-4 font-bold text-slate-100 hover:scale-105 transition-all ease-in-out duration-200 active:scale-100">
      <button className="p-2 px-4 rounded-lg bg-sky-600">Create Group</button>
    </div>
  )
}
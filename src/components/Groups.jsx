/* eslint-disable react/prop-types */
import { addDoc, collection } from "firebase/firestore";
import ModalGroup from "./ModalCreateGroup";
import { db } from "../firebase";
import { useState } from "react";
import Group from "./Group";

export default function Groups({groups, getGroupId }) {
    const [isModalShow, setModalShow] = useState(false);

      // handleFunctions
      const handleCloseModal = () => {
        setModalShow(false);
      }
      const createGroupHandle = async (newData) => {
        try {
         await addDoc(collection(db, "groups"), newData);
        } catch (e) {
          console.error(e.message);
        }
        setModalShow(false);
      }

    return (
      <>
        <ModalGroup
          isShowed={isModalShow}
          onSubmit={createGroupHandle}
          onModalClose={handleCloseModal}
        />
        <div className="bg-blue-400 md:w-2/4 h-screen overflow-y-scroll pt-20 ">
          <div className="w-full h-ful items-center">
            <CreateGrupBtn onCreateGroupClick={() => setModalShow(true)} />
            {groups.length == 0 ? (
              <div className={``}>
                <h1 className="font-bold text-slate-200">
                  There no groups yet, create one.
                </h1>
              </div>
            ) : (
              <Group data={groups} getGroupId={getGroupId} />
            )}
          </div>
        </div>
      </>
    );
}

function CreateGrupBtn({onCreateGroupClick}) {
    return (
      <div className="p-4 font-bold text-slate-100">
        <button onClick={onCreateGroupClick} className="p-2 px-4 rounded-lg bg-sky-600 hover:scale-105 transition-all ease-in-out duration-200 active:scale-100">Create Group</button>
      </div>
    )
  }
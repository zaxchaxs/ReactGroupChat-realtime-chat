/* eslint-disable react/prop-types */

import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

import { useState } from "react";
// components
import ModalGroup from "./ModalCreateGroup";
import Group from "./Group";

export default function Groups({ groups, getGroupId }) {
  const [isModalShow, setModalShow] = useState(false);

  // handle Functions
  const handleCloseModal = () => {
    setModalShow(false);
  };

  const createGroupHandle = async (newData) => {
    try {
      await addDoc(collection(db, "groups"), newData);
    } catch (e) {
      console.error(e.message);
    } finally {
      setModalShow(false);
    }
  };

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
            <div className="w-full overflow-hidden">
              {groups.map((data, idx) => (
                <Group
                  key={idx}
                  index={idx}
                  data={data}
                  getGroupId={getGroupId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CreateGrupBtn({ onCreateGroupClick }) {
  return (
    <div className="p-4 font-bold text-slate-100">
      <button
        onClick={onCreateGroupClick}
        className="p-2 px-4 rounded-lg bg-sky-600 hover:scale-105 transition-all ease-in-out duration-200 active:scale-100"
      >
        Create Group
      </button>
    </div>
  );
}

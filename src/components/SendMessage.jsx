import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function SendMessage({groupId}) {
    const {user} = useAuth();
    const [message, setMessage] = useState("");
    const newMessage = {
        created_at: new Date(),
        created_by: user.displayName,
        uid: user.uid,
        group_id: groupId,
        message: message
    };

    // handler funtion
    const handleSubmitMessage = (event) =>{
        event.preventDefault();
        if(message == "") {
            alert("Pesan tidak boleh kosong");
            return;
        };
        console.log(user);
        console.log(newMessage);
    };

    return (
      <form className="flex p-4 bg-gray-400 rounded-t-xl gap-4" onSubmit={(e) => handleSubmitMessage(e)}>
        <input
          type="text"
          className="w-full p-2 rounded-lg"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button onClick={handleSubmitMessage} className="p-1 px-3 bg-blue-500 rounded-md font-bold text-white hover:scale-105 transition-all ease-in-out duration-200">
          Send
        </button>
      </form>
    );
}
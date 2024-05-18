/* eslint-disable react/prop-types */

import Button from "./Button";
import { Authentication } from "../firebase";

export default function Navbar() {
  const { user, logoutHandler } = Authentication();

    return (
      <div className="p-5 bg-sky-600 justify-between flex fixed w-full z-10">
        <div className="w-fit text-white font-bold text-center text-2xl">
            <a href="/">ReactGroup Chat</a>
        </div>
        <div className="flex gap-8 items-center">
            <Button val={"Home"} route={"/"} />
            <Button val={"Chat"} route={"/chat"} />
            <Button val={"About"} route={"/about"} />
        </div>
        <div className="text-white font-bold text-center text-xl items-center">
            <Button isBtnLoggin={true} val={user ? "Logout" : "Login"} route={user ? "#" : "/Login"} handleClick={user && logoutHandler}/>
        </div>
      </div>
    );
}

// child components
// function Button({ isBtnLoggin, val, route }) {
//     return (
//       <div className={`w-fit p-1 rounded-lg text-white font-bold text-center ${isBtnLoggin ? "bg-sky-700" : "bg-sky-500"} shadow-md hover:scale-105 transition-all ease-in-out duration-200 active:scale-100`}>
//         <a href={route} className="p-2 px-3">{val}</a>
//       </div>
//     );
// }
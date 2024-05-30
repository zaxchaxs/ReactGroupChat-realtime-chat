/* eslint-disable react/prop-types */

import Button from "./Button";
// import { Authentication } from "../firebase";
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logoutHandler } = useAuth();

  return (
    <div className="p-5 bg-sky-600 justify-between flex fixed w-full z-20">
      <div className="w-fit text-white font-bold text-center text-2xl">
        <a href="/">ReactGroup Chat</a>
      </div>
      <div className="flex gap-8 items-center">
        <Button val={"Home"} route={"/"} />
        <Button val={"Chat"} route={"/chat"} />
        <Button val={"About"} route={"/about"} />
      </div>
      <div className="text-white font-bold text-center text-xl items-center">
        <Button
          isBtnLoggin={true}
          val={user ? "Logout" : "Login"}
          route={user ? "/" : "/"}
          handleClick={user && logoutHandler}
        />
      </div>
    </div>
  );
}
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Button from "./Button";

export default function Navbar() {
  const [isNavOpen, setNavOpen] = useState(false);
  const { user, logoutHandler } = useAuth();

  useEffect(() => {
    setNavOpen(false);
  }, [user]);

  // handle function
  const handleHumBtn = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <div className="p-4 md:p-5 bg-sky-600 justify-between flex fixed w-full z-20 items-center">
      <div className="w-fit text-white font-bold text-center text-lg md:text-2xl z-50">
        <a href="/">ReactGroup Chat</a>
      </div>
      <div className="md:flex hidden md:gap-8 items-center">
        <Button val={"Home"} route={"/"} />
        <Button val={"Chat"} route={"/chat-homepage"} />
        <Button val={"About"} route={"/about"} />
      </div>
      <div className="text-white font-bold text-center hidden md:block md:text-xl items-center">
        <Button
          isBtnLoggin={true}
          val={user ? "Logout" : "Login"}
          handleClick={user && logoutHandler}
        />
      </div>
      <div className="items-center flex md:hidden z-50">
        <HumbergerBtn onHumBtnClick={handleHumBtn} isNavOpen={isNavOpen} />
      </div>
      <div className="absolute top-0 h-screen">
        <NavItems
          isNavOpen={isNavOpen}
          onButtonClick={handleHumBtn}
          user={user}
          handleLogoutClick={logoutHandler}
        />
      </div>
    </div>
  );
}

// Child Components
function HumbergerBtn({ isNavOpen, onHumBtnClick }) {
  return (
    <button
      className=" button-three"
      aria-controls="primary-navigation"
      aria-expanded={isNavOpen ? "true" : "false"}
      onClick={onHumBtnClick}
    >
      <svg
        stroke="var(--button-color)"
        fill="none"
        className="hamburger w-10"
        viewBox="-10 -10 120 120"
      >
        <path
          className="line"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70"
        ></path>
      </svg>
    </button>
  );
}

function NavItems({ isNavOpen, onButtonClick, user, handleLogoutClick }) {
  return (
    <>
      <nav
        className={`fixed z-30 items-center justify-center backdrop-blur-sm transition-all w-screen left-0 ease-in-out duration-700 overflow-hidden ${
          isNavOpen ? "" : "hidden"
        }`}
      >
        <div className="relative backdrop-blur-sm bg-opacity-60 flex flex-col items-center space-x-8 w-screen h-screen bg-sky-600">
          <div className="flex flex-col items-center gap-5  my-auto mx-0">
            <h1 className="text-4xl font-bold text-white py-4 border-b-4">
              Menu
            </h1>
            <MenuButton val={"Home"} route={"/"} onMenuClick={onButtonClick} />
            <MenuButton
              val={"Chat"}
              route={"/chat-homepage"}
              onMenuClick={onButtonClick}
            />
            <MenuButton
              val={"About"}
              route={"/about"}
              onMenuClick={onButtonClick}
            />
            <MenuButton
              val={user ? "Logout" : "Login"}
              route={"/"}
              onMenuClick={user ? handleLogoutClick : onButtonClick}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

function MenuButton({ val, route, onMenuClick }) {
  return (
    <Link
      to={route}
      className="text-2xl text-white font-bold p-2 hover:scale-105 duration-200 transition-all ease-in-out"
      onClick={onMenuClick}
    >
      <h1>{val}</h1>
    </Link>
  );
}

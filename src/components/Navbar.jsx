/* eslint-disable react/prop-types */

// import { Authentication } from "../firebase";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import Button from "./Button";

export default function Navbar() {
  const [isNavOpen, setNavOpen] = useState(false);
  const { user, logoutHandler } = useAuth();

  const handleHumBtn = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <div className="p-5 bg-sky-600 justify-between flex fixed w-full z-20 items-center">
      <div className="w-fit text-white font-bold text-center text-lg md:text-2xl">
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
          route={user ? "/" : "/"}
          handleClick={user && logoutHandler}
        />
      </div>
      <div className="items-center flex md:hidden z-50">
        <HumbergerBtn onHumBtnClick={handleHumBtn} isNavOpen={isNavOpen} />
      </div>
      <div className="absolute top-0 h-screen">
        <NavItems isNavOpen={isNavOpen} onButtonClick={handleHumBtn} />
      </div>
    </div>
  );
}


// Child Components

function HumbergerBtn({isNavOpen, onHumBtnClick}) {
  return(
      <button className=" button-three" aria-controls="primary-navigation" aria-expanded={isNavOpen ? "true" : "false"} onClick={onHumBtnClick} >
          <svg stroke="var(--button-color)" fill="none" className="hamburger w-10" viewBox="-10 -10 120 120">
              <path className="line" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70">
              </path>
          </svg>
      </button>
  )
}

function NavItems({ isNavOpen, onButtonClick}) {

	return (
    <>
      <nav
        className={`fixed z-[45] items-center justify-center backdrop-blur-sm transition-all w-screen ease-in-out duration-700 overflow-hidden ${isNavOpen ? "" : "hidden"}`}
      >
        <div className="relative  backdrop-blur-sm opacity-95 flex flex-col items-center space-x-8 w-screen h-screen bg-gray-700">
          <div className="flex flex-col items-center space-y-8 my-auto mx-0">
            <h1
              className="text-6xl font-bold text-white "
            >
              Menu
            </h1>
            {/* <MenuButton onButtonClick={onButtonClick} delay={1.1} menu={"Home"} itemVariants={itemVariants} isNavOpen={isNavOpen} routes={"/#home"} index={1} /> */}
						{/* <MenuButton onButtonClick={onButtonClick} delay={1.2} menu={"About"} itemVariants={itemVariants} isNavOpen={isNavOpen} routes={"/#about"} index={2} /> */}
						{/* <MenuButton onButtonClick={onButtonClick} delay={1.3} menu={"Projects"} itemVariants={itemVariants} isNavOpen={isNavOpen} routes={"/#projects"} index={3} /> */}
						{/* <MenuButton onButtonClick={onButtonClick} delay={1.4} menu={"Contact"} itemVariants={itemVariants} isNavOpen={isNavOpen} routes={"/#contact"} index={4} /> */}
            <MenuButton val={"Home"} />
            <MenuButton val={"Home"} />
            <MenuButton val={"Home"} />
            <MenuButton val={"Home"} />
          </div>
        </div>
      </nav>
    </>
  );
}

function MenuButton({val}) {
  return (
    <div className="cursor-pointer text-2xl text-white font-bold p-2 hover:scale-105 duration-200 transition-all ease-in-out">
      <h1>
        {val}
      </h1>
    </div>
  )
}
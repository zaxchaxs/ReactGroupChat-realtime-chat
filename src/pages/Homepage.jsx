import { useAuth } from "../contexts/AuthContext";

import googleIcon from "/icons/google-icon.svg";
import HomeIcon from "/icons/HomeChat-icon.svg";

// components
import Button from "../components/Button";
import Loader from "../components/Loader";
import ButtonAuth from "../components/ButtonAuth";

export default function Home() {
  const {
    user,
    loading: authLoad,
    loginWithGoogleHandler,
    logoutHandler,
  } = useAuth();

  if (authLoad && !user) {
    return <Loader />;
  }

  return (
    <section className="p-4 w-full pt-20">
      <div className="md:flex justify-between items-center">
        {/* image */}
        <div className="md:w-full w-[40vh] mx-auto items-center flex justify-center p-10 md:p-24">
          <img src={HomeIcon} alt="testing" width={300} />
        </div>

        {/* detail */}
        <div className={`p-4 text-gray-800 font-bold w-full`}>
          <h1 className="text-3xl p-2">Create Your Circle Group</h1>
          <h2 className="text-xl p-2 font-bold">
            Start chit chat with your friends.
          </h2>
          <div className="flex gap-7 p-2 my-10 justify-center">
            <Button
              val={"Start Chat"}
              route={"/chat-homepage"}
              isHidden={!user}
            />

            <ButtonAuth
              icon={googleIcon}
              handleClickButton={user ? logoutHandler : loginWithGoogleHandler}
              val={user ? "Logout" : "Login With Google"}
              isLoggin={user}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

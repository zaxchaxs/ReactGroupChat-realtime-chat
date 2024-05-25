import Button from "../components/Button";
import testingLogo from "../assets/react.svg";

import { Authentication } from "../firebase";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";

export default function Home() {

    const [isLogin, setIsLogin] = useState(false);

    const { user, googleHandlerLogin, logoutHandler, auth, db} = Authentication();

    const testingHandle = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach(doc => {
                const { first } = doc.data();
                console.log(first);
            })
        } catch(e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        user ? setIsLogin(true) : setIsLogin(false);
    }, [user]);

    return(
        <section className="p-4 w-full pt-20">
            <div className="flex justify-between items-center">
                {/* image */}
                <div className="w-full items-center flex justify-center p-24">
                    <img src={testingLogo} alt="testing" width={300} />
                </div>

                {/* detail */}
                <div className={`p-4 text-gray-800 font-bold w-full `}>
                    <h1 className="text-3xl p-2">Create Your Circle Group</h1>
                    <h2 className="text-xl p-2 font-normal">Start chit chat with your friends.</h2>
                    <div className="flex gap-7 p-2 my-10 justify-center"> 
                        <Button val={"Login"} handleClick={testingHandle} />    
                        {/* <Button val={"Register"} handleClick={logout} /> */}
                        <Button val={isLogin ? "Logout" : "Login with google"} isBtnLoggin={true} handleClick={isLogin ? logoutHandler : googleHandlerLogin} />
                    </div>
                </div>
            </div>
        </section>
    )
}
import Button from "../components/Button";
import testingLogo from "../assets/react.svg";

export default function Home() {
    return(
        <section className="p-4 w-full pt-20">
            <div className="flex justify-between items-center">
                {/* image */}
                <div className="w-full items-center flex justify-center p-24">
                    <img src={testingLogo} alt="testing" width={300} />
                </div>

                {/* detail */}
                <div className="p-4 text-gray-800 font-bold w-full">
                    <h1 className="text-3xl p-2">Create Your Circle Group</h1>
                    <h2 className="text-xl p-2 font-normal">Start chit chat with your friends.</h2>
                    <div className="flex gap-7 p-2 my-10 justify-center"> 
                        <Button val={"Login"} route={"/login"} />
                        <Button val={"Register"} route={"/Register"} />
                        <Button val={"Login with google"} isBtnLoggin={true} route={"/Register"} />
                    </div>
                </div>
            </div>
        </section>
    )
}
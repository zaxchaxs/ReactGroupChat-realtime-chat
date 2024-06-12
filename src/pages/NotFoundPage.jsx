import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();
  return (
    <>
      <div className="md:px-20 border-2 border-black w-full h-screen items-center flex justify-center">
        <div className="font-bold text-lg text-gray-900 w-full p-5">
          <h1>{`Where ya going? There's nothing to looking here`}</h1>
          <h1 className="font-semibold">Gak ada apa-apa disini bang.</h1>
        <button onClick={() => navigate("/")} className="p-1.5 px-4 bg-sky-700 hover:bg-sky-600 rounded-md items-center text-white font-semibold my-5">ok</button>
        </div>
      </div>
    </>
  );
}

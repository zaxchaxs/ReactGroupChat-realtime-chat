/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function AboutPage() {
    
    const techStack = ["React JS", "Firebase", "Firestore", "Tailwind CSS", "React Router", "Vite"];
    const contacts = [
        {
            srcImage: "/icons/contacts/email-icon.svg",
            srcRef: "mailto:irzirahmatullah@gmail.com"
        },
        {
            srcImage: "/icons/contacts/github-icon.svg",
            srcRef: "https://github.com/zaxchaxs"
        },
        {
            srcImage: "/icons/contacts/linkedin-icon.svg",
            srcRef: "https://www.linkedin.com/in/irzi-rahmatullah-65a44b294"
        },
        {
            srcImage: "/icons/contacts/instagram-icon.svg",
            srcRef: "https://www.instagram.com/irzirhmtllh"
        },
        {
            srcImage: "/icons/contacts/facebook-icon.svg",
            srcRef: "https://web.facebook.com/Irzi.meghankhapthap/"
        }
    ];

    return (
      <div className="pt-20 md:px-20">
        <div className="w-full text-gray-800 font-bold p-5 ">
          <h1 className="text-2xl underline p-2">About This Project</h1>
          <p className="text-justify md:text-center">
            I developed a real-time chat project using React.js, React Router, and Firebase Firestore. This project provided me with an opportunity to explore cutting-edge technologies while expanding my knowledge in web application development. Through this project, I learned a lot about directly using React, including effectively implementing hooks like useRef to manage DOM references. Additionally, I utilized Firestore for real-time database management, allowing for instant data synchronization between users. I also gained experience using React Router to handle navigation between pages within my application, ensuring a smooth and intuitive user experience. This project gave me a deeper practical understanding of modern web application development with state-of-the-art technologies.
          </p>
        </div>
        <div className="p-5 py-10 w-full text-gray-800 font-bold">
          <h1 className="text-xl p-2 underline">Tech Used</h1>
          <div className="justify-center gap-4 text-white w-full col columns-2 md:columns-3 font-semibold">
            {techStack.map((e, i) => (
              <p className="p-1 mb-2 bg-sky-700 rounded-md" key={i}>{`| ${e} |`}</p>
            ))}
          </div>
        </div>

        <div className="p-5 py-10 w-full font-bold">
            <h1 className="text-xl p-2 underline text-gray-800 ">Contact Me</h1>
            <div className="flex justify-center gap-2 p-2">
                {
                    contacts.map((e, i) => {
                        return <SosmedIcon key={i} srcRef={e.srcRef} srcImage={e.srcImage} />
                    })
                }
            </div>
        </div>
        <Footer />
      </div>
    );
}

function SosmedIcon({srcImage, srcRef}) {
    return(
        <Link className="bg-sky-700 rounded-full p-2 md:p-3 items-center flex" to={srcRef} target="blank" >
            <img className="w-7 md:w-8" src={srcImage} alt="contacts" />
        </Link>
    )
}

function Footer() {
    return(
        <div className="w-full text-center text-sm md:text-base">
            <p>This Website is built with <a className="underline font-bold text-gray-900" href="https://nextjs.org/" target="blank">React.JS & Vite</a>.</p>
            <p>© Irzi 2024. <b>All right reserved.</b></p>
        </div>
    )
}
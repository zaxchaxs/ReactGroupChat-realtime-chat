import { Link } from "react-router-dom"

export default function Group({data, getGroupId}) {

    return data.map((group, i) => {
        return <Link to={`/chat-page?groupId=${group.id}`} onClick={() => getGroupId(group.id)} key={i} >
            <div className={`w-full p-2 rounded-md ${i % 2 == 0 ? "bg-sky-600" : "border-y-2 border-sky-600"} hover:scale-105 duration-200 transition-all ease-in-out`}>
                <h1>{group.name}</h1>
                <h3>{group.created_by}</h3>
            </div>
        </Link>
    })
}
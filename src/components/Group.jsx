import { Link } from "react-router-dom"

export default function Group({data}) {

    return data.map((group, i) => {
        return <Link to={`/char?groupId=${group.id}`} key={i} >
            <div className={`w-full p-2 rounded-md ${i % 2 == 0 ? "bg-sky-600" : "border-y-2 border-sky-700"}`}>
                <h1>{group.name}</h1>
                <h3>{group.created_by}</h3>
            </div>
        </Link>
    })
}
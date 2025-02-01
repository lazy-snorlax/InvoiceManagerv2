import { Link } from "react-router"

const ListItem = ({headings, item, link}) => {
    return (
        <div className="grid grid-cols-5 grid-rows-1 gap-4 w-full">
            {headings.map((h, index) => (
                <div className="my-auto" key={index}>{index}</div>
            ))}
            <div className="my-auto">
                <Link className="btn btn-neutral w-50" to={`${link}/01`}>Open Invoice</Link>
            </div>
        </div>
    )
}

export default ListItem
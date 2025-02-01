import ListItem from "./ListItem"

const List = ({ headings, link, list }) => {
    return (
        <div className="container mx-auto mt-4">
            <div className="card bg-base-300 w-full">
                <div className="card-header text-center mt-3">
                    <h3 className="font-bold text-3xl">Invoices</h3>
                </div>
                <div className="card-body items-center text-center">
                    <div className="grid grid-cols-5 grid-rows-1 gap-4 w-full">
                        {headings.map((h) => (
                            <div className="my-auto" key={h}>{h}</div>
                        ))}
                        <div className="my-auto"></div>
                    </div>

                    {list.map((item, index) => (
                        <ListItem headings={headings} item={item} link={link} key={`list-item-${index}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default List
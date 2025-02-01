import { Link } from "react-router"

type Props = {}

const CustomerList = (props: Props) => {
    return (
        <>
            <h2>This is a list of customers</h2>
            <div className="">
                <Link className="btn btn-neutral w-50" to="/customers/01">Look at a Customer</Link>
            </div>
        </>
    )
}

export default CustomerList
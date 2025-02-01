import { Link } from "react-router"

type Props = {}

const CustomerList = (props: Props) => {
    return (
        <>
        <div className="container mx-auto mt-4">
            <div className="card bg-base-300 w-full">
                <div className="card-body items-center text-center">
                    <h2>This is a list of customers</h2>
                    <div className="">
                        <Link className="btn btn-neutral w-50" to="/customers/01">Look at a Customer</Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CustomerList
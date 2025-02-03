import CustomerForm from "../../components/CustomerForm"

type Props = {}

const CustomerPage = ({ record }) => {
    return (
        <div className="container mx-auto mt-4">
            <div className="card bg-base-300 w-full">
                <div className="card-body items-center text-center">
                    <CustomerForm customer={record} key={record.id} />
                </div>
            </div>
        </div>
    )
}

export default CustomerPage
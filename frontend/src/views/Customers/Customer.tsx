import { useEffect, useRef, useState } from "react"
import CustomerForm from "../../components/CustomerForm"
import { useCustomerStore } from "../../stores/customer"

const CustomerPage = ({ record }) => {
    const [customer, setCustomer] = useState(record)
    const customerRef = useRef(customer)
    const { save, setCurrentRecord } = useCustomerStore()

    const handleOnChange = (event) => {
        const { name, value } = event.target
        customerRef.current = ({...customer, [name]: value})
        setCurrentRecord(customerRef.current)
    }

    useEffect(() => {
        setCustomer(record)
    })

    return (
        <div className="container mx-auto mt-4">
            <div className="card bg-base-300 w-full">
                <div className="card-body items-center text-center">
                    <CustomerForm customer={record} key={record.id} handle={handleOnChange} />
                    <button className="btn btn-success" onClick={save}>Save Customer</button>
                </div>
            </div>
        </div>
    )
}

export default CustomerPage
import { Link } from "react-router"

type Props = {}

const InvoiceList = (props: Props) => {
    return (
        <>
            <h2>This is a list of invoices</h2>
            <div className="">
                <Link className="btn btn-neutral w-50" to="/invoices/01">Open an Invoice</Link>
            </div>
        </>
    )
}

export default InvoiceList
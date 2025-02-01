
import InvoiceForm from '../../components/Invoice/InvoiceForm'
import InvoiceTransHeader from '../../components/Invoice/InvoiceTransHeader'
import CreateInvoiceTransHeader from '../../components/Invoice/CreateInvoiceTransHeader'

type Props = {}

const InvoicePage = (props: Props) => {
    return (
        <>
            <div className="container mx-auto mt-4">
                <div className="card bg-base-300 w-100">
                    <div className="card-body items-center text-center">
                        <InvoiceForm />
                    </div>
                </div>
                <div className="mt-3 mx-2 px-1">
                    <CreateInvoiceTransHeader />
                </div>
                <div className="card bg-base-300 w-100 mt-3">
                    <div className="card-body items-center text-center py-1">
                        <InvoiceTransHeader id={1} />
                        <InvoiceTransHeader id={2} />
                        <InvoiceTransHeader id={3} />
                    </div>
                </div>
                {/* <div className="card bg-base-300 w-100 mt-3">
                    <div className="card-body items-center text-center py-1">
                    </div>
                </div>
                <div className="card bg-base-300 w-100 mt-3">
                    <div className="card-body items-center text-center py-1">
                    </div>
                </div> */}
                <div className="text-center mt-3">
                    <a className="btn btn-primary">Preview Invoice</a>
                </div>
            </div>
        </>
    )
}

export default InvoicePage
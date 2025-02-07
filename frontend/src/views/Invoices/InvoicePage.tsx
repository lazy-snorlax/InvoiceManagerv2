
import InvoiceForm from '../../components/InvoiceForm'
import TransactionHeader from '../../components/Transactions/TransactionHeader'
import CreateTransactionHeader from '../../components/Transactions/CreateTransactionHeader'

const InvoicePage = ({record}) => {
    // console.log(">>> record: ", record)
    return (
        <div className="container mx-auto mt-4">
            <div className="card bg-teal-500 w-full">
                <div className="card-body items-center text-center">
                    <InvoiceForm invoice={record} key={record.id} />
                </div>
            </div>
            <div className="mt-3 mx-2 px-1">
                <CreateTransactionHeader />
            </div>
            {record.transactions.map((transaction, index) => (
                <div className="card bg-base-300 w-100 mt-3" key={`trans-header=${transaction.titleNo}-${index}`} >
                    <div className="card-body items-center text-center py-1">
                        <TransactionHeader transaction={transaction} />
                    </div>
                </div>
            ))}
            <div className="sticky bottom-0 card bg-base-300 w-100 mt-3 z-10">
                <div className="card-body items-center text-center py-1">
                    <div className="grid grid-cols-10 grid-rows-1 gap-4">
                        <button className="btn btn-primary">Preview Invoice</button>
                        <button className="btn btn-primary">Print Invoice</button>
                        <button className="btn btn-success">Save Invoice</button>
                        <span className="col-span-4"></span>
                        <span className="my-auto col-span-1">Item Excl Total: $0.00</span>
                        <span className="my-auto col-span-1">GST Total: $0.00</span>
                        <span className="my-auto col-span-1">Item Inc Total: $0.00</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoicePage
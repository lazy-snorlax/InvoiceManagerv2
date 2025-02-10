
import InvoiceForm from '../../components/InvoiceForm'
import TransactionHeader from '../../components/Transactions/TransactionHeader'
import CreateTransactionHeader from '../../components/Transactions/CreateTransactionHeader'
import { useInvoiceStore } from '../../stores/invoice'
import { useEffect, useState } from 'react'

const InvoicePage = ({ record }) => {
    const { 
        save, 
        addNewTransactionHead, 
        updateTransactionHead,
        removeTransactionHead,

        addNewTransactionLine,
        updateTransactionLine,
        removeTransactionLine,

        setCurrentRecord,
     } = useInvoiceStore()
    const [invoice, setInvoice] = useState(record)
    const [transactions, setTransactions] = useState(invoice.transactions)

    const handleOnChange = (event) => {
        const { name, value } = event.target
        setInvoice({...invoice, [name]: value})
        setCurrentRecord(invoice)
    }

    // Totals
    const calculateCost = () => {
        let total_cost = 0
        transactions.forEach(transaction => {
            total_cost += parseFloat(transaction.lines.reduce(function (sum, line) { return sum + parseFloat(line.cost) }, 0))
        });
        // console.log(total_cost)
        return total_cost.toFixed(2)
    }

    useEffect(() => {
        setTransactions(useInvoiceStore.getState().currentRecord?.transactions)
        calculateCost()
    })

    const handleSave = () => { save() }

    return (
        <div className="container mx-auto mt-4">
            <div className="card bg-teal-500 w-full">
                <div className="card-body items-center text-center">
                    <InvoiceForm invoice={invoice} key={invoice.id} handle={handleOnChange} />
                </div>
            </div>
            <div className="mt-3 mx-2 px-1">
                <CreateTransactionHeader transactions={transactions} add={addNewTransactionHead} />
            </div>
            {transactions.map((transaction, index) => (
                <div className="card bg-base-300 w-100 mt-3" key={`trans-header=${transaction.titleNo}-${index}`} >
                    <div className="card-body items-center text-center py-1">
                        <TransactionHeader transaction={transaction} updateHead={updateTransactionHead} deleteHead={removeTransactionHead} lineFuncs={[addNewTransactionLine, updateTransactionLine, removeTransactionLine]} />
                    </div>
                </div>
            ))}
            <div className="sticky bottom-0 card bg-base-300 w-100 mt-3 z-10">
                <div className="card-body items-center text-center py-1">
                    <div className="grid grid-cols-10 grid-rows-1 gap-4">
                        <button className="btn btn-primary">Preview Invoice</button>
                        <button className="btn btn-primary">Print Invoice</button>
                        <button className="btn btn-success" onClick={handleSave}>Save Invoice</button>
                        <span className="col-span-4"></span>
                        <span className="my-auto col-span-1">Item Excl Total: ${(calculateCost())}</span>
                        <span className="my-auto col-span-1">GST Total: ${(calculateCost() * 0.1).toFixed(2)}</span>
                        <span className="my-auto col-span-1">Item Inc Total: ${(parseFloat(calculateCost()) + parseFloat(calculateCost() * 0.1)).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoicePage
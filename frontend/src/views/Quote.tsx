
import CreateTransactionHeader from '../components/Transactions/CreateTransactionHeader'
import TransactionHeader from '../components/Transactions/TransactionHeader'

type Props = {}

const Quote = ({record}) => {
    return (
        <div className="container mx-auto mt-4">
            <div className="card bg-yellow-100 w-full">
                <div className="card-body items-center text-center">
                    <h2>This is quote #{record.id}</h2>
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
        </div>
    )
}

export default Quote
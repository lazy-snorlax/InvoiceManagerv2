import RecordNavigator from '../../components/RecordNavigator'
import { useCustomerStore } from '../../stores/customer'
import CustomerPage from "./Customer"
import { useEffect } from 'react'

const Customers = () => {
    const { records, currentRecord, loading, error, fetchRecords, fetchFirstRecord, next, previous, first, last, newRecord } = useCustomerStore()

    useEffect(() => {
        fetchRecords(),
        fetchFirstRecord()
    }, [fetchRecords])

    return (
        <div>
            <RecordNavigator state={{
                records,
                currentRecord,
                loading,
                error
            }}
            actions={{
                next, 
                previous,
                first,
                last,
                newRecord
            }} 
            RenderComponent={CustomerPage} 
            />
        </div>
    )
}

export default Customers
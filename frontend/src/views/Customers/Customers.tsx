import RecordNavigator from '../../components/RecordNavigator'
import { useCustomerStore } from '../../stores/customer'
import CustomerPage from "./Customer"
import { useEffect } from 'react'

const Customers = () => {
    const { records, currentRecord, loading, error, fetchRecords, next, previous } = useCustomerStore()

    useEffect(() => {
        fetchRecords()
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
                previous
            }} 
            RenderComponent={CustomerPage} 
            />
        </div>
    )
}

export default Customers
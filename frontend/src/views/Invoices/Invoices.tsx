import RecordNavigator from '../../components/RecordNavigator'
import InvoicePage from './InvoicePage'
import { useInvoiceStore } from '../../stores/invoice'
import { useEffect } from 'react'

const Invoices = () => {
    const { records, currentRecord, loading, error, fetchRecords, fetchLatestRecord, next, previous, first, last } = useInvoiceStore()

    useEffect(() => {
        fetchRecords(),
        fetchLatestRecord()
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
            }} 
            RenderComponent={InvoicePage}
            />
        </div>
    )
}

export default Invoices
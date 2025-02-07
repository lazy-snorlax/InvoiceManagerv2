import RecordNavigator from '../../components/RecordNavigator'
import InvoicePage from './InvoicePage'
import { useInvoiceStore } from '../../stores/invoice'
import { useEffect } from 'react'

const Invoices = () => {
    const { invoices, currentInvoice, loading, error, fetchInvoices, nextInvoice, previousInvoice } = useInvoiceStore()

    useEffect(() => {
        fetchInvoices()
    }, [fetchInvoices])

    return (
        <div>
            <RecordNavigator state={{
                invoices,
                currentInvoice,
                loading,
                error
            }}
            actions={{
                nextInvoice, 
                previousInvoice
            }} key={currentInvoice ? currentInvoice.id : 0} />
        </div>
    )
}

export default Invoices
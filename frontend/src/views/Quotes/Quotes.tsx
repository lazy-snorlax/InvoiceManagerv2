import { useEffect } from 'react'
import RecordNavigator from '../../components/RecordNavigator'
import Quote from "./Quote"
import { useQuoteStore } from '../../stores/quote'

const Quotes = () => {
    const { records, currentRecord, loading, error, fetchRecords, fetchLatestRecord, next, previous } = useQuoteStore()

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
                previous
            }} 
            RenderComponent={Quote}
            />
        </div>
    )
}

export default Quotes
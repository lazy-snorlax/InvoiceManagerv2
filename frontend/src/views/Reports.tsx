import { useRef, useState } from "react"
import { useInvoiceStore } from "../stores/invoice"
import { string } from "yup"

type Props = {}

const Reports = (props: Props) => {
    const { downloadCSV } = useInvoiceStore()
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const fromRef = useRef(fromDate)
    const toRef = useRef(toDate)

    const handleStart = (event) => {
        fromRef.current = event.target.value
    }

    const handleEnd = (event) => {
        toRef.current = event.target.value
    }

    const handle = (range) => {
        console.log('>>> handler', fromRef.current, toRef.current)
        if (typeof range === 'string') {
            downloadCSV(range, null, null)
        } else {
            downloadCSV(null, fromRef.current, toRef.current)
        }
    }


    return (
        <div className="container mx-auto mt-4">
            <div className="card bg-base-300 w-full">
                <div className="card-body items-center text-center">
                    Select the start and end dates for the reports.

                    <div className="grid grid-cols-2 grid-rows-1 gap-4">
                        {/* <button className="btn btn-secondary">Sales by Last Month</button> */}
                        {/* <button className="btn btn-secondary">Sales by Last Year</button> */}
                        <button className="btn btn-secondary" onClick={() => handle('month')} >Export Last Month to Excel</button>
                        <button className="btn btn-secondary" onClick={() => handle('year')}>Export Last Year to Excel</button>
                    </div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-4 mt-10">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Start Date</span>
                            </div>
                            <input type="date" className="input input-bordered w-full" name="start_date" defaultValue={fromRef.current} onChange={handleStart} />
                        </label>
                        
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">End Date</span>
                            </div>
                            <input type="date" className="input input-bordered w-full" name="end_date" defaultValue={toRef.current} onChange={handleEnd} />
                        </label>
                    </div>
                    
                    <div className="grid grid-cols-1 grid-rows-1 gap-4">
                        {/* <button className="btn btn-secondary">Custom Sales Report</button> */}
                        <button className="btn btn-secondary" onClick={() => handle(null)}>Custom Export to Excel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports
type Props = {}

const Reports = (props: Props) => {
    return (
        <div className="container mx-auto mt-4">
            <div className="card bg-base-300 w-full">
                <div className="card-body items-center text-center">
                    Select the start and end dates for the reports.

                    <div className="grid grid-cols-2 grid-rows-1 gap-4">
                        <button className="btn btn-secondary">Sales by Last Month</button>
                        <button className="btn btn-secondary">Sales by Last Year</button>
                        <button className="btn btn-secondary">Export Last Month to Excel</button>
                        <button className="btn btn-secondary">Export Last Year to Excel</button>
                    </div>

                    <div className="grid grid-cols-2 grid-rows-1 gap-4 mt-10">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Start Date</span>
                            </div>
                            <input type="date" className="input input-bordered w-full" />
                        </label>
                        
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">End Date</span>
                            </div>
                            <input type="date" className="input input-bordered w-full" />
                        </label>
                    </div>
                    
                    <div className="grid grid-cols-2 grid-rows-1 gap-4">
                        <button className="btn btn-secondary">Custom Sales Report</button>
                        <button className="btn btn-secondary">Custom Export to Excel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports
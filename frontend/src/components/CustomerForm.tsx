import React from "react";

const CustomerForm = (props) => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-3 grid-rows-1 gap-4">
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Customer Name</span>
                </div>
                <input type="text" defaultValue={props.customer.name} className="input input-bordered w-full" />
            </label>
            </div>
        </div>
    )
}

export default CustomerForm
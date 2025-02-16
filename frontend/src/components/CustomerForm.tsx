import React from "react";

const CustomerForm = (props) => {
    const { handle } = props

    return (
        <div className="w-full">
            <div className="grid grid-cols-3 grid-rows-1 gap-4">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Customer Name</span>
                    </div>
                    <input type="text" defaultValue={props.customer.company_name} className="input input-bordered w-full" name="company_name" onChange={handle} />
                </label>
                
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Contact Name</span>
                    </div>
                    <input type="text" defaultValue={props.customer.contact_name} className="input input-bordered w-full" name="contact_name" onChange={handle} />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">ABN</span>
                    </div>
                    <input type="text" defaultValue={props.customer.abn} className="input input-bordered w-full" name="abn" onChange={handle} />
                </label>
            </div>
            
            <div className="grid grid-cols-3 grid-rows-1 gap-4">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input type="text" defaultValue={props.customer.email} className="input input-bordered w-full" name="email" onChange={handle} />
                </label>
                
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Phone</span>
                    </div>
                    <input type="text" defaultValue={props.customer.phone} className="input input-bordered w-full" name="phone" onChange={handle} />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Mobile</span>
                    </div>
                    <input type="text" defaultValue={props.customer.mobile} className="input input-bordered w-full" name="mobile" onChange={handle} />
                </label>
            </div>
            
            <div className="grid grid-cols-2 grid-rows-1 gap-10 mt-4">
                <div className="grid grid-cols-1 grid-rows-4 gap-4">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Location Address</span>
                        </div>
                        <input type="text" defaultValue={props.customer.location_address} className="input input-bordered w-full" name="location_address" onChange={handle} />
                    </label>
                    
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">City</span>
                        </div>
                        <input type="text" defaultValue={props.customer.location_city} className="input input-bordered w-full" name="location_city" onChange={handle} />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">State</span>
                        </div>
                        <input type="text" defaultValue={props.customer.location_state} className="input input-bordered w-full" name="location_state" onChange={handle} />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Postcode</span>
                        </div>
                        <input type="text" defaultValue={props.customer.location_post_code} className="input input-bordered w-full" name="location_post_code" onChange={handle} />
                    </label>
                </div>

                <div className="grid grid-cols-1 grid-rows-4 gap-4">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Postal Address</span>
                        </div>
                        <input type="text" defaultValue={props.customer.postal_address} className="input input-bordered w-full" name="postal_address" onChange={handle} />
                    </label>
                    
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">City</span>
                        </div>
                        <input type="text" defaultValue={props.customer.postal_city} className="input input-bordered w-full" name="postal_city" onChange={handle} />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">State</span>
                        </div>
                        <input type="text" defaultValue={props.customer.postal_state} className="input input-bordered w-full" name="postal_state" onChange={handle} />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Postcode</span>
                        </div>
                        <input type="text" defaultValue={props.customer.postal_post_code} className="input input-bordered w-full" name="postal_post_code" onChange={handle} />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default CustomerForm
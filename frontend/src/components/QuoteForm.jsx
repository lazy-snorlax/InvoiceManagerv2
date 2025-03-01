import React from "react";
import Select from "react-select"
import { useCustomerStore } from "../stores/customer"
import { useState, useEffect } from "react";

const QuoteForm = (props) => {
  const { handle } = props
  const { records, fetchRecords } = useCustomerStore()
  
  const reactCompanyOptions = records.map(option => ({
    value: option.id,
    label: option.company_name
  }))
  const defaultCompany = reactCompanyOptions.find(option => option.value == props.invoice.company)
  
  const handleSelectChange = (value, actionMeta) => {
    // console.log(">>> handle", value, actionMeta)
    handle({ value, actionMeta })
  }

  useEffect(() => {
    fetchRecords()
    // setCompanyOptions(options)
    console.log(">>> defaultCompany: ", defaultCompany)
  }, [fetchRecords])
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Company</span>
          </div>
          <Select options={reactCompanyOptions} value={defaultCompany} name="company" onChange={(value, actionMeta) => handleSelectChange(value, actionMeta)} 
            classNames={{ 
              control: () => 'h-12',
              input: () => 'form-control w-full',
            }} />
        </label>
        
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Credit Type</span>
          </div>
          <input type="text" defaultValue={props.invoice.credittype} className="input input-bordered w-full" name="credittype" onChange={handle} />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Date</span>
          </div>
          <input type="date" defaultValue={props.invoice.date} className="input input-bordered w-full" name="date" onChange={handle} />
        </label>
      </div>

      <div className="grid grid-cols-2 grid-rows-1 gap-4">
        {/* <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Type</span>
          </div>
          <select className="select select-bordered">
            <option>Type #1</option>
          </select>
        </label> */}

        {/* <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Type</span>
          </div>
          <input type="text" defaultValue={props.invoice.type} className="input input-bordered w-full" />
        </label> */}

        {/* <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Paid</span>
          </div>
          <select className="select select-bordered">
            <option>Paid #1</option>
            <option>Paid #2</option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Business No</span>
          </div>
          <input type="text" defaultValue={props.invoice.businessNo} className="input input-bordered w-full" name="businessNo" onChange={handle} />
        </label> */}
      </div>

      <div className="grid grid-cols-2 grid-rows-1 gap-4">
        {/* <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Business</span>
          </div>
          <select className="select select-bordered">
            <option>Business #1</option>
          </select>
        </label> */}


        {/* <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Payment Details</span>
          </div>
          <input type="text" placeholder="Type here" className="input input-bordered w-full" />
        </label> */}
      </div>

      <div className="grid grid-cols-1 grid-rows-1 gap-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Note</span>
          </div>
          <input type="text" placeholder="Type here" defaultValue={props.invoice.note} className="input input-bordered w-full" name="note" onChange={handle} />
        </label>
      </div>
    </div>
  );
}

export default QuoteForm;

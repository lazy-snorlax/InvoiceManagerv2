import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const InvoiceForm = (props) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Company</span>
          </div>
          <input type="text" defaultValue={props.invoice.company} className="input input-bordered w-full" />
        </label>
        
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Credit Type</span>
          </div>
          <input type="text" defaultValue={props.invoice.credittype} className="input input-bordered w-full" />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Date</span>
          </div>
          <input type="date" defaultValue={props.invoice.date} className="input input-bordered w-full" />
        </label>
      </div>

      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Type</span>
          </div>
          <input type="text" defaultValue={props.invoice.type} className="input input-bordered w-full" />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Order No</span>
          </div>
          <input type="text" defaultValue={props.invoice.orderNo} className="input input-bordered w-full" />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Business No</span>
          </div>
          <input type="text" defaultValue={props.invoice.businessNo} className="input input-bordered w-full" />
        </label>
      </div>

      <div className="grid grid-cols-1 grid-rows-1 gap-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Note</span>
          </div>
          <input type="text" placeholder="Type here" defaultValue={props.invoice.note} className="input input-bordered w-full" />
        </label>
      </div>
    </div>
  );
}

export default InvoiceForm;

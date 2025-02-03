import React, { useState, useEffect } from "react";
import axios from "axios";
import InvoiceTransLines from "./TransactionLines";

const CreateTransactionHeader = () => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="grid grid-cols-5 grid-rows-1 gap-4 mb-1">
          <label className="form-control w-full col-span-4">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
          </label>
          <button className="mt-auto btn btn-success">New Address</button>
        </div>
      </div>
      <br />
    </div>
  );
}

export default CreateTransactionHeader;

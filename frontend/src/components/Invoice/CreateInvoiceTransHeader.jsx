import React, { useState, useEffect } from "react";
import axios from "axios";
import InvoiceTransLines from "./InvoiceTransLines";

const CreateInvoiceTransHeader = () => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="grid grid-cols-5 grid-rows-1 gap-4 mb-1">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full col-span-3">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
          </label>

          <button className="mt-auto btn btn-success">Add New Transaction Header</button>
        </div>
      </div>
      <br />

      {/* <InvoiceTransLines
        lineId={id != undefined ? id : 0}
        route={route}
        lines={tranlines}
        routeExpcodes={route.expensecodes}
      /> */}
    </div>
  );
}

export default CreateInvoiceTransHeader;

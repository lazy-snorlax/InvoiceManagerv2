import React, { useState, useEffect } from "react";
import axios from "axios";
import InvoiceTransLines from "./InvoiceTransLines";

const InvoiceTransHeader = ({id}) => {

  const [isOpen, setIsOpen] = useState(false)
  const toggleCollapse = () => setIsOpen(!isOpen)

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="grid grid-cols-5 grid-rows-1 gap-4 mb-1">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full" defaultValue={`Title #${id}`} />
          </label>

          <label className="form-control w-full col-span-3">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full" defaultValue={`Description #${id}`} />
          </label>

          <div className="mt-auto">
            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-error">X</button>
            <button
              onClick={toggleCollapse}
              className="btn btn-ghost"
            >
              {isOpen ? '-' : '+'}
            </button>
          </div>
        </div>

        <div className={`transition-all duration-300 mt-4 ${isOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <InvoiceTransLines />
          </div>
        </div>

      </div>
      <br />

      
    </div>
  );
}

export default InvoiceTransHeader;

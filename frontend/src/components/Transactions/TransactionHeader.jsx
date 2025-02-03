import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionLines from "./TransactionLines";

const TransactionHeader = (props) => {
  const [isOpen, setIsOpen] = useState(true)
  const toggleCollapse = () => setIsOpen(!isOpen)

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="grid grid-cols-5 grid-rows-1 gap-4 mb-1">
          <label className="form-control w-full col-span-4">
            <input type="text" placeholder="Type here" className="input input-bordered w-full mt-2" defaultValue={props.transaction.description} />
          </label>

          <div className="mt-auto">
            <button onClick={toggleCollapse} className="btn btn-ghost text-3xl">{isOpen ? '-' : '+'}</button>
            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-error">X</button>
          </div>
        </div>

        <div className={`transition-all duration-300 mt-2 ${isOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <TransactionLines lines={props.transaction.lines} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionHeader;

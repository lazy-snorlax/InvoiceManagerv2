import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import InvoiceTransLines from "./InvoiceTransLines";

function InvoiceTransLine(props) {
  const itemline = {}
  return (
    <div className="grid grid-cols-11 grid-rows-1 gap-2">
      <div className="my-auto">Item No</div>
      <div className="my-auto ">Item</div>
      <div className="my-auto col-span-4 col-start-3">
        <textarea className="textarea textarea-bordered w-full" name="Description" id="" rows="2" defaultValue="Description"></textarea>
      </div>
      <div className="my-auto overflow-x-hidden">
        <label className="input input-bordered flex items-center gap-2">
          <input type="number" className="grow w-full" placeholder="10.00" />
          <span>%</span>
        </label>
      </div>
      <div className="my-auto">
        <span className="">0.00</span>
      </div>
      <div className="my-auto ">
        <label className="input input-bordered flex items-center gap-2">
          <span>$</span>
          <input type="number" className="grow" placeholder="Cost" />
        </label>
      </div>
      <div className="my-auto ">
        <select name="Expense" id="" className="input input-bordered w-full">
          <option value="test">Test</option>
        </select>
      </div>
      <div className=""></div>
    </div>
  );
}

export default InvoiceTransLine;

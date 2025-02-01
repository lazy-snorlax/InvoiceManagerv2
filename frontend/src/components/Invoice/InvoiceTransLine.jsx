import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import InvoiceTransLines from "./InvoiceTransLines";

function InvoiceTransLine(props) {
  return (
    <div className="grid grid-cols-11 grid-rows-1 gap-2">
      <div className="my-auto">{props.line.item}</div>
      <div className="my-auto col-span-5 col-start-2">
        <textarea className="textarea textarea-bordered w-full" name="Description" id="" rows="2" placeholder="Description" defaultValue={props.line.description}></textarea>
      </div>
      <div className="my-auto overflow-x-hidden">
        <label className="input input-bordered flex items-center gap-2">
          <input type="number" className="grow w-full" placeholder="10.00" defaultValue={props.line.tax} />
          <span>%</span>
        </label>
      </div>
      <div className="my-auto">
        <span className="">0.00</span>
      </div>
      <div className="my-auto ">
        <label className="input input-bordered flex items-center gap-2">
          <span>$</span>
          <input type="number" className="grow" placeholder="Cost" defaultValue={props.line.cost} />
        </label>
      </div>
      <div className="my-auto ">
        <select name="Expense" id="" className="input input-bordered w-full" defaultValue={props.line.expense}>
          <option value="sales">Sales</option>
        </select>
      </div>
      <div className=""></div>
    </div>
  );
}

export default InvoiceTransLine;

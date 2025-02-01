import axios from "axios";
import React, { useState, useEffect } from "react";
import InvoiceTransLine from "./InvoiceTransLine";

const InvoiceTransLines = (props) => {
  return (
    <>
      <div className="overflow-x-auto h-64">
        <div className="grid grid-cols-11 grid-rows-1 gap-2">
          <div className="my-auto">Item No</div>
          <div className="my-auto col-span-5 col-start-2">Description</div>
          <div className="my-auto ">Tax%</div>
          <div className="my-auto ">GST</div>
          <div className="my-auto ">Cost</div>
          <div className="my-auto ">Expense</div>
          <button className="btn btn-primary" onClick={() => { console.log("new transaction line btn clicked") }}>+</button>
        </div>
        {props.lines.map((line, index) => (
          <InvoiceTransLine line={line} key={`line-${index}`} />
        ))}
      </div>
    </>
  );
}

export default InvoiceTransLines;

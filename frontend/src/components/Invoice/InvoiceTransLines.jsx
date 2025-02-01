import axios from "axios";
import React, { useState, useEffect } from "react";
import InvoiceTransLine from "./InvoiceTransLine";

function InvoiceTransLines({ lineId, route, lines, routeExpcodes }) {
  return (
    <>
      <div className="overflow-x-auto h-64">

        {/* <table className="table table-normal w-full" id="translines">
          <thead>
            <tr>
              <th className="text-center ">Item No</th>
              <th className="text-center ">Item</th>
              <th className="text-center w-2/3">Description</th>
              <th className="text-center w-5">Tax%</th>
              <th className="text-center ">GST</th>
              <th className="text-center ">Cost</th>
              <th className="text-center ">Expense</th>
              <th>
                <a className="btn btn-primary" onClick={() => { console.log("new transaction line btn clicked") }}>+</a>
              </th>
            </tr>
          </thead>
          <tbody>
            <InvoiceTransLine />
            {tranlines.map((line) => {
              // console.log(">>> Line", line);
              return (
                <InvoiceTransLine
                  key={line.Id}
                  route={route}
                  line={line}
                  getTotals={getTotals.bind(this)}
                  expensecodes={expensecodes}
                />
              );
            })}
          </tbody>
        </table> */}

        {/* Table Header */}
        <div className="grid grid-cols-11 grid-rows-1 gap-2">
          <div className="my-auto">Item No</div>
          <div className="my-auto ">Item</div>
          <div className="my-auto col-span-4 col-start-3">Description</div>
          <div className="my-auto ">Tax%</div>
          <div className="my-auto ">GST</div>
          <div className="my-auto ">Cost</div>
          <div className="my-auto ">Expense</div>
          <button className="btn btn-primary" onClick={() => { console.log("new transaction line btn clicked") }}>+</button>
        </div>
        <InvoiceTransLine />
        <InvoiceTransLine />
      </div>

      <div className="mt-4 flex space-x-4 text-right">
        <div className="w-8/12"></div>
        <div className="mb-4 w-2/12">
          <label htmlFor="ItemGST" className="label">Item GST</label>
          <label className="input input-bordered flex items-center gap-2">
            <span>$</span>
            <input type="text" step=".01" className="grow w-full" />
          </label>
        </div>
        <div className="mb-4 w-2/12">
          <label htmlFor="ItemGST" className="label">Item Excl Total</label>
          <label className="input input-bordered flex items-center gap-2">
            <span>$</span>
            <input type="text" step=".01" className="grow w-full" />
          </label>
        </div>
        <div className="mb-4 w-2/12">
          <label htmlFor="ItemGST" className="label">Item Incl Total</label>
          <label className="input input-bordered flex items-center gap-2">
            <span>$</span>
            <input type="text" step=".01" className="grow w-full" />
          </label>
        </div>
      </div>
    </>
  );
}

export default InvoiceTransLines;

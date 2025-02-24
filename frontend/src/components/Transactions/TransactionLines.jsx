import React, { useState, useEffect } from "react";
import InvoiceTransLine from "./TransactionLine";

const InvoiceTransLines = ({ lines, lineFuncs }) => {
  const [list, setList] = useState(lines)
  const add = lineFuncs[0]
  const update = lineFuncs[1]
  const remove = lineFuncs[2]

  const handleAddLine = () => {
    const newLine = {
      "id": null,
      "titleNo": list[0].titleNo,
      "item": (list.length + 1),
      "description": null,
      "tax": 10.0,
      "cost": 0.0,
      "expense": null
    }
    add(newLine)
  }

  useEffect(() => { setList(lines) })

  return (
    <div className="overflow-x-auto h-64">
      <div className="grid grid-cols-11 grid-rows-1 gap-2 sticky top-0 bg-base-100 mb-3">
        <div className="my-auto">Item No</div>
        <div className="my-auto col-span-5 col-start-2">Description</div>
        <div className="my-auto ">Tax%</div>
        <div className="my-auto ">GST</div>
        <div className="my-auto ">Cost</div>
        <div className="my-auto ">Expense</div>
        <button className="btn btn-primary text-2xl" onClick={handleAddLine}>+</button>
      </div>
      {list.map((line, index) => (
        <InvoiceTransLine line={line} key={`line-${index}`} update={update} remove={remove} />
      ))}
    </div>
  );
}

export default InvoiceTransLines;

import React, { useEffect, useRef, useState } from "react";

function InvoiceTransLine({ line, update, remove}) {
  const [itemLine, setItemLine] = useState(line)
  const lineRef = useRef(itemLine)

  const handleOnChange = (event) => {
    const { name, value } = event.target
    lineRef.current = ({...lineRef.current, [name]: value})
    update(lineRef.current)
  }

  const handleRemove = () => { remove(itemLine) }

  useEffect(() => {
    setItemLine(line)
  })

  return (
    <div className="grid grid-cols-11 grid-rows-1 gap-2">
      <div className="my-auto">{itemLine.item}</div>
      <div className="my-auto col-span-5 col-start-2">
        <textarea className="textarea textarea-bordered w-full" name="description" id="" rows="2" placeholder="Description" defaultValue={itemLine.description} onChange={handleOnChange}></textarea>
      </div>
      <div className="my-auto overflow-x-hidden">
        <label className="input input-bordered flex items-center gap-2">
          <input type="number" name="tax" className="grow w-full" placeholder="10.00" defaultValue={itemLine.tax} onChange={handleOnChange} />
          <span>%</span>
        </label>
      </div>
      <div className="my-auto">
        <span className="">${(itemLine.cost * 0.1).toFixed(2)}</span>
      </div>
      <div className="my-auto ">
        <label className="input input-bordered flex items-center gap-2">
          <span>$</span>
          <input type="number" name="cost" className="grow" placeholder="Cost" defaultValue={itemLine.cost} onChange={handleOnChange} />
        </label>
      </div>
      <div className="my-auto ">
        <select name="expense" id="" className="input input-bordered w-full" defaultValue={itemLine.expense} onChange={handleOnChange}>
          <option value="sales">Sales</option>
        </select>
      </div>
      <div className="my-auto ">
        <button className="btn btn-error" onClick={handleRemove}>X</button>
      </div>
    </div>
  );
}

export default InvoiceTransLine;

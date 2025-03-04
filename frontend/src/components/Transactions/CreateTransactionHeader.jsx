import React, { useState, useEffect } from "react";

const CreateTransactionHeader = ({ transactions, add }) => {
  const [list, setList] = useState(transactions)
  const [description, setDescription] = useState()

  const newHeaderOnChange = (event) => {
    const { value } = event.target
    setDescription(value)
  }

  useEffect(() => { setList(transactions) })

  const addNewHeader = () => {
    if (description == '') { return }
    // TODO: refactor for post request
    const newLine = {
        "titleNo": "new-" + (list.length),
        "description": description,
        "lines": [{
            "titleNo": "new-" + (list.length),
            "item": 1,
            "description": null,
            "tax": 10.0,
            "cost": 0.0,
            "expense": null,
        }]
    }
    add([...list, newLine])
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="grid grid-cols-5 grid-rows-1 gap-4 mb-1">
          <label className="form-control w-full col-span-4">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full" name="description" onChange={newHeaderOnChange} />
          </label>
          <button className="mt-auto btn btn-success" onClick={addNewHeader}>New Address</button>
        </div>
      </div>
      <br />
    </div>
  );
}

export default CreateTransactionHeader;

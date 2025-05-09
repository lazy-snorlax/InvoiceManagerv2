import React, { useState, useEffect } from "react";
import TransactionLines from "./TransactionLines";

const TransactionHeader = ({ transaction, updateHead, deleteHead, lineFuncs }) => {
  const [isOpen, setIsOpen] = useState(true)
  const toggleCollapse = () => setIsOpen(!isOpen)
  
  const [trans, setTrans] = useState(transaction)
  const [disabledHeader, setDisabledHeader] = useState(true)

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setTrans({...trans, [name]: value})
  }

  const editHeader = () => { setDisabledHeader(!disabledHeader) }
  const updateHeader = () => {
    updateHead(trans)
    editHeader()
  }
  const removeHeader = () => { deleteHead(trans) }

  useEffect(() => { setTrans(transaction) })

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="grid grid-cols-5 grid-rows-1 gap-4 mb-1">
          <label className="form-control w-full col-span-4">
            <input type="text" placeholder="Type here" className="input input-bordered w-full mt-2" name="description" defaultValue={trans.description} disabled={disabledHeader} onChange={handleOnChange} />
          </label>

          <div className="mt-auto ms-auto join">
            <button onClick={toggleCollapse} className="btn btn-ghost join-item"><span className="text-4xl">{isOpen ? '-' : '+'}</span></button>
            {disabledHeader ? 
              <button className="btn btn-primary join-item" onClick={editHeader}>Edit</button>
              : 
              <button className="btn btn-success join-item" onClick={updateHeader}>Update</button>
            }
            <button className="btn btn-error join-item" onClick={removeHeader}>X</button>
          </div>
        </div>

        <div className={`transition-all duration-300 mt-2 ${isOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <TransactionLines lines={trans.lines} lineFuncs={lineFuncs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionHeader;

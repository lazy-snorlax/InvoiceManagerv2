import { useEffect, useRef, useState } from "react";

const SettingsForm = ({ settings, update }) => {
  const [setting, setSetting] = useState(settings)
  const settingRef = useRef(setting)

  const handleOnChange = (event) => {
    const { name, value } = event.target
    settingRef.current = ({ ...settingRef.current, [name]: value })
    update(settingRef.current)
  }

  return (
    <div className="w-full">
      <form data-name="Tablebusinessdetail">
        <div className="flex space-x-4">
          <div className="mb-4 w-1/4">
            <label className="label" htmlFor="business_name">
              <span className="label-text"> Business Name:</span>
            </label>
            <input type="input" className="input input-bordered w-full" name="business_name" data-type="varchar" defaultValue={setting.business_name} onChange={handleOnChange} />
          </div>
          <div className="mb-4 w-1/4">
            <label className="label" htmlFor="contact_name">
              <span className="label-text">Contact:</span>
            </label>
            <input type="input" className="input input-bordered w-full" name="contact_name" data-type="varchar" defaultValue={setting.contact_name} onChange={handleOnChange} />
          </div>
          <div className="mb-4 w-2/4">
            <label className="label" htmlFor="email">
              <span className="label-text">Email:</span>
            </label>
            <input type="input" className="input input-bordered w-full" name="email" data-type="varchar" defaultValue={setting.email} onChange={handleOnChange} />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="mb-4 w-1/4">
            <label className="label" htmlFor="phone">
              <span className="label-text">Phone:</span>
            </label>
            <input type="input" className="input input-bordered w-full" name="phone" data-type="varchar" defaultValue={setting.phone} onChange={handleOnChange} />
          </div>
          <div className="mb-4 w-1/4">
            <label className="label" htmlFor="mobile">
              <span className="label-text">Mobile:</span>
            </label>
            <input type="input" className="input input-bordered w-full" name="mobile" data-type="varchar"  defaultValue={setting.mobile} onChange={handleOnChange} />
          </div>
          <div className="mb-4 w-1/4">
            <label className="label" htmlFor="abn">
              <span className="label-text">ABN:</span>
            </label>
            <input type="input" className="input input-bordered w-full" name="abn" data-type="varchar"  defaultValue={setting.abn} onChange={handleOnChange} />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="mb-4 w-1/4">
            <label className="label" htmlFor="address">
              <span className="label-text">Address:</span>
            </label>
            <input className="input input-bordered w-full" name="address" data-type="varchar" defaultValue={setting.address} onChange={handleOnChange} />
          </div>
          <div className="mb-4 w-1/4">
            <label className="label" htmlFor="city">
              <span className="label-text">City:</span>
            </label>
            <input className="input input-bordered w-full" name="city" data-type="varchar" defaultValue={setting.city} onChange={handleOnChange} />
          </div>
          <div className="mb-4 w-1/4">
            <label className="label" htmlFor="state">
              <span className="label-text">State:</span>
            </label>
            <input className="input input-bordered w-full" name="state" data-type="varchar" defaultValue={setting.state} onChange={handleOnChange} />
          </div>
          <div className="mb-4 w-1/4">
            <label className="label" htmlFor="post_code">
              <span className="label-text">Post Code:</span>
            </label>
            <input className="input input-bordered w-full" name="post_code" data-type="varchar"  defaultValue={setting.post_code} onChange={handleOnChange} />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="mb-4 w-2/4">
            <label className="label" htmlFor="note1">
              <span className="label-text">Note:</span>
            </label>
            <textarea className="textarea textarea-bordered w-full" name="note1" data-type="varchar" rows="3" defaultValue={setting.note1} onChange={handleOnChange} />
          </div>
          <div className="mb-4 w-2/4">
            <label className="label" htmlFor="note2">
              <span className="label-text">Note:</span>
            </label>
            <textarea className="textarea textarea-bordered w-full" name="note2" data-type="varchar" rows="3" defaultValue={setting.note2} onChange={handleOnChange} />
          </div>
        </div>
      </form>

      {/* <BusinessLogo route={route} img={data.ImgLoc} /> */}
    </div>
  );
}

export default SettingsForm;

import { useEffect, useRef, useState } from "react"
import SettingsForm from "../components/SettingsForm"
import { useSettingsStore } from "../stores/settings"

const SettingsPage = () => {
    const { settings, loading, error, getSettings, setSettings, uploadLogo, save } = useSettingsStore()
    const [imgSrc, setImgSrc] = useState(import.meta.env.VITE_API_URL + 'logo');

    const handleImg = (event) => {
        setImgSrc(URL.createObjectURL(event.target.files[0]))
        const payload = new FormData()
        payload.append('file', event.target.files[0])
        uploadLogo(payload)
    }

    useEffect(() => {
        getSettings()
    }, [getSettings])

    if (loading) { return <div>Loading...</div> }
    if (error) { return <div>Error: {error}</div> }
    if (settings == null) {
        return (
            <div className="min-h-screen flex flex-col">
                <div className="grow">
                    <h1>No records found</h1>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* <h1 className="h1">Set settings for the application here</h1> */}
            <div className="container mx-auto mt-4">
                <div className="card bg-base-300 w-100">
                    <div className="card-body items-center text-center">
                        <SettingsForm settings={settings} update={setSettings} />
                        <div className="">
                            <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={handleImg} />
                            <img src={imgSrc} alt="Logo" width={200} height={200} />
                        </div>
                    </div>
                    <div className="card-actions my-3 justify-center">
                        <button className="btn btn-success" onClick={save}>Save Settings</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingsPage
import SettingsForm from "../components/SettingsForm"

const SettingsPage = () => {
    return (
        <>
            {/* <h1 className="h1">Set settings for the application here</h1> */}
            <div className="container mx-auto mt-4">
                <div className="card bg-base-300 w-100">
                    <div className="card-body items-center text-center">
                        <SettingsForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingsPage
import InvoicePage from "./Invoice"

type Props = {}

const InvoiceList = (props: Props) => {
    const invoice = {
        "company": null,
        "type": null,
        "date": null,
        "credittype": null,
        "paid": null,
        "businessNo": null,
        "paymentDetail": null,
        "note": null,
        "transactions": []
    }

    return (
        <div className="max-h-screen flex flex-col">
            <div className="flex-grow">
                <InvoicePage invoice={invoice} />
            </div>
            
            <div className="bg-gray-800 text-white p-4">
                I'm at the bottom of the page
            </div>
        </div>
    )
}

export default InvoiceList
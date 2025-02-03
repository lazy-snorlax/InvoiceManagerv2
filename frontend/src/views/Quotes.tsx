import { Link } from "react-router"
import RecordNavigator from '../components/RecordNavigator'
import Quote from "./Quote"

type Props = {}

const Quotes = (props: Props) => {
    const data = [
        {
            "id": null,
            "businessNo": null,
            "companyNo": null,
            "note": null,
            "type": null,
            "date": null,
            "transactions": []
        },
    ]
    return (
        <div>
            <RecordNavigator data={data} RenderComponent={Quote} />
        </div>
    )
}

export default Quotes
import { Link } from "react-router"
import RecordNavigator from '../../components/RecordNavigator'
import CustomerPage from "./Customer"

type Props = {}

const Customers = (props: Props) => {
    return (
        <div>
            <RecordNavigator data={[]} RenderComponent={CustomerPage} />
        </div>
    )
}

export default Customers
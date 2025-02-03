import customers from '../../data/customers.json'
import RecordNavigator from '../../components/RecordNavigator'
import CustomerPage from "./Customer"

type Props = {}

const Customers = (props: Props) => {
    return (
        <div>
            <RecordNavigator data={customers} RenderComponent={CustomerPage} />
        </div>
    )
}

export default Customers
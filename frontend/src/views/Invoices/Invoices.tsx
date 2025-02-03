import RecordNavigator from '../../components/RecordNavigator'
import invoices from '../../data/invoices.json'
import InvoicePage from './InvoicePage'

const Invoices = () => {
    return (
        <div>
            <RecordNavigator data={invoices} RenderComponent={InvoicePage} />
        </div>
    )
}

export default Invoices
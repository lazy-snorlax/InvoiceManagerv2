import quotes from '../../data/quotes.json'
import RecordNavigator from '../../components/RecordNavigator'
import Quote from "./Quote"

type Props = {}

const Quotes = (props: Props) => {
    return (
        <div>
            <RecordNavigator data={quotes} RenderComponent={Quote} />
        </div>
    )
}

export default Quotes
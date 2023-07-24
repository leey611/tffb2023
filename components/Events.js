import { isEmpty } from '../utils/helpers'
let airtableApiKey = process.env.AIRTABLE_API_KEY
let airtableBaseId = process.env.AIRTABLE_BASE_ID
let airtableTableId = process.env.AIRTABLE_TABLE_EVENTS_ID
let airtableTableSponsorsViewId = process.env.AIRTABLE_TABLE_EVENTS_VIEW_ID

async function getEvents() {
  try {
    const res = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}?view=${airtableTableSponsorsViewId}`, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
      cache: 'no-store' 
    });
    const data = await res.json();
    console.log('events', data.records)
    return data.records
  } catch (error) {
    console.log(error);
  }
}

export default async function Events({language}) {
    const events = await getEvents()
    return (
        <>
            {events.map(e => !isEmpty(e.fields) && 
            <div>
                {/* using a checkbox + label and CSS to make an accordian, both X and label can toggle it */}
                <input type="checkbox" id={e.id} className="event__checkbox"></input>
                <div className="event__item item w-full">
                    {/* when accordion is close */}
                    <label htmlFor={e.id}>
                        <h3 className="name">{e.fields[`Name_${language}`]}</h3>
                        <div className="cross">
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="#000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div> 
                    </label>
                    {/* when accordion is open */}
                    <div>{e.fields[`Note_${language}`]}</div>
                </div>
            </div>)}
        </>
    )
}
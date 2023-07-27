import { isEmpty } from '../utils/helpers'
import Event from './Event'
import '../app/events.scss'
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
    //console.log('events', data.records)
    return data.records
  } catch (error) {
    console.log(error);
  }
}

export default async function Events({language}) {
    const events = await getEvents()
    return (
        <>
          {events?.map(event => !isEmpty(event.fields) && <Event key={event.id} id={event.id} language={language} event={event.fields}></Event>
          )}
        </>
    )
}
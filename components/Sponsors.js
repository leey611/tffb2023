let airtableApiKey = process.env.AIRTABLE_API_KEY
let airtableBaseId = process.env.AIRTABLE_BASE_ID
let airtableTableId = process.env.AIRTABLE_TABLE_SPONSORS_ID
let airtableTableSponsorsViewId = process.env.AIRTABLE_TABLE_SPONSORS_VIEW_ID


async function getSponsors() {
  try {
    const res = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}?view=${airtableTableSponsorsViewId}`, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
      cache: 'no-store' 
    });
    const data = await res.json();
    //console.log('data records', data.records[0]);
    return data
  } catch (error) {
    console.log(error);
  }
}
export default async function Sponsors(props) {
    const sponsors = await getSponsors()
    const { language } = props
    return (
        <div>
            {sponsors.records.map(sponsor =><div>
                <h4>{sponsor.fields[`Name_${language}`]}</h4>
            </div>)}
        </div>
    )
}
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
        <div className="lg:ml-[800px] mx-[3rem] grid grid-cols-3 gap-4 text-center">
            {sponsors.records.map(sponsor =><div className="sponsor">
                <img className="block mx-auto" src={'https://www.webfx.com/wp-content/uploads/2021/10/generic-image-placeholder.png'}></img>
                <h4>{sponsor.fields[`Name_${language}`]}</h4>
            </div>)}
        </div>
    )
}
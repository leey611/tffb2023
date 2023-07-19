import { NextResponse } from 'next/server'
let airtableApiKey = process.env.AIRTABLE_API_KEY
let airtableBaseId = process.env.AIRTABLE_BASE_ID
let airtableTableId = process.env.AIRTABLE_TABLE_FILMS_ID
let airtableTableFilmsViewId = process.env.AIRTABLE_TABLE_FILMS_VIEW_ID
 
export async function GET() {
    try {
        const res = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}?view=${airtableTableFilmsViewId}`, {
          headers: {
            Authorization: `Bearer ${airtableApiKey}`,
          },
          cache: 'no-store' 
        });
        const data = await res.json();
        //console.log('data records', data.records[0]);
        return NextResponse.json(data)
      } catch (error) {
        console.log(error);
      }
}


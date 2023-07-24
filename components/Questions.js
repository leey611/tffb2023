import '../app/questions.scss'
import { isEmpty } from '../utils/helpers'
import Answer from './Answer'
let airtableApiKey = process.env.AIRTABLE_API_KEY
let airtableBaseId = process.env.AIRTABLE_BASE_ID
let airtableTableId = process.env.AIRTABLE_TABLE_QUESTIONS_ID
let airtableTableSponsorsViewId = process.env.AIRTABLE_TABLE_QUESTIONS_VIEW_ID


async function getQuestions() {
  try {
    const res = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}?view=${airtableTableSponsorsViewId}`, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
      cache: 'no-store' 
    });
    const data = await res.json();
    return data.records
  } catch (error) {
    console.log(error);
  }
}
export default async function Questions({language}) {
    const questions = await getQuestions()
    console.log(questions[0])
    return (
        <>
            {questions.map(q => !isEmpty(q.fields) && 
            <div>
                {/* using a checkbox + label and CSS to make an accordian, both X and label can toggle it */}
                <input type="checkbox" id={q.id} className="question__checkbox"></input>
                <div className="qa__item item w-full">
                    {/* when accordion is close */}
                    <label htmlFor={q.id}>
                        <h3 className="question">{q.fields[`Question_${language}`]}</h3>
                        <div className="cross">
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="#000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div> 
                    </label>

                    {/* when accordion is open */}
                    <Answer answer={q.fields[`Answer_${language}`]}></Answer>
                </div>
            </div>)}
        </>
    )
}
export default function Answer({answer}) {
    const answers = answer.split('\n')
    return (
        <div className="answer text-primary">
            <ul>
            {answers.map(a => <li className="py-[0.2rem] leading-1" >{a}</li>)}
            </ul>
        </div>
    )
}
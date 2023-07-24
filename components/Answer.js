export default function Answer({answer}) {
    const answers = answer.split('\n')
    return (
        <div className="answer">
            {answers.map(a => <p>{a}</p>)}
        </div>
    )
}
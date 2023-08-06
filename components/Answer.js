import RichText from './RichText';
export default function Answer({ answer }) {
    return (
        <div className="answer text-primary max-w-3xl">
            <RichText content={answer}/>
        </div>
    )
}
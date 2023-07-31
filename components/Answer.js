import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
export default function Answer({ answer }) {
    return (
        <div className="answer text-primary">
            <div>
                <ReactMarkdown children={answer} remarkPlugins={[remarkGfm]} />
            </div>
        </div>
    )
}
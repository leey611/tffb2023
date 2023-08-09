import { Remarkable } from 'remarkable';
const md = new Remarkable();

function renderMarkdownToHTML(markdown) {
    // This is ONLY safe because the output HTML
    // is shown to the same user, and because you
    // trust this Markdown parser to not have bugs.
    const renderedHTML = md.render(markdown);
    return {__html: renderedHTML};
}

export default function RichText({ content }) {
    const markup = renderMarkdownToHTML(content);
    return (
        <div dangerouslySetInnerHTML={markup} className='richtext'></div>
    )
}
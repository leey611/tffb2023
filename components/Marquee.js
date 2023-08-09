import Link from 'next/link'

export default function Marquee(props) {
    const { content, link } = props

    return (
        <Link href={link}>
            <div className="marquee text-h4">
                <span>
                    <img className="inline-block w-7 px-1" src="../img/logo_no_text.png"></img>
                    {content}
                    <img className="inline-block w-7 px-1" src="../img/logo_no_text.png"></img>
                    {content}
                    <img className="inline-block w-7 px-1" src="../img/logo_no_text.png"></img>
                    {content}
                    <img className="inline-block w-7 px-1" src="../img/logo_no_text.png"></img>
                    {content}
                    <img className="inline-block w-7 px-1" src="../img/logo_no_text.png"></img>
                </span>
            </div>
        </Link>
    );
};

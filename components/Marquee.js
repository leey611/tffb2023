import Link from 'next/link'

export default function Marquee(props) {
    const { content, link } = props

    return (
        <Link href={link}>
            <div className="marquee text-h4">
                <span>
                    <img className="inline-block w-10" src="img/logo.png"></img>
                    {content}
                    <img className="inline-block w-10" src="img/logo.png"></img>
                    {content}
                    <img className="inline-block w-10" src="img/logo.png"></img>
                    {content}
                    <img className="inline-block w-10" src="img/logo.png"></img>
                    {content}
                    <img className="inline-block w-10" src="img/logo.png"></img>
                </span>
            </div>
        </Link>
    );
};

import Link from 'next/link'

export default function Marquee(props) {
    const { content, link } = props

    return (
        <Link href={link}>
        <div className="marquee text-h3">
            <span>
                {content}
            </span>
        </div>
        </Link>
    );
};

export default function SocialHandle(props) {
    const {logo, link} = props;
    return (
        <div className="answer text-primary">
            <a href={link}><img src={logo} className="w-[45px]"></img></a>
        </div>
    )
}
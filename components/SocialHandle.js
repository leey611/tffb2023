export default function SocialHandle(props) {
    const {logo, link} = props;
    return (
        <div className="social text-primary">
            <a href={link} target='_blank'><img src={logo} className="w-[45px]"></img></a>
        </div>
    )
}
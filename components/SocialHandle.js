export default function SocialHandle(props) {
    const {logo, link} = props;
    return (
        <div className="social text-primary">
            <a href={link} target='_blank'><img src={logo} className="w-9 md:w-11"></img></a>
        </div>
    )
}
export default async function Sponsors(props) {
    const { language, sponsors } = props
    return (
        <div className="lg:ml-[800px] mx-[3rem] grid grid-cols-3 gap-4 text-center">
            {sponsors.map(sponsor =><div className="sponsor">
                <img className="block mx-auto" src={sponsor.fields['Img']}></img>
                <h4>{sponsor.fields[`Title_${language}`]}</h4>
            </div>)}
        </div>
    )
}
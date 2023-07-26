export default async function Sponsors(props) {
    const { language, sponsors } = props
    return (
        <div className="lg:ml-[500px] mx-[3rem] grid grid-cols-3 gap-8 pt-10 text-center">
            {sponsors.map(sponsor =><div className="sponsor">
                <div className="flex block mx-auto w-[5rem] h-[5rem] mb-10">
                <img className="w-full m-auto object-fill" src={sponsor.fields['Img']}></img>
                </div>
                <h4 className="hidden md:block lg:block">{sponsor.fields[`Title_${language}`]}</h4>
            </div>)}
        </div>
    )
}
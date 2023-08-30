export default async function Sponsors(props) {
    const { language, sponsors } = props
    return (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-8 pt-10 text-center">
            {sponsors.map(sponsor => <div className="sponsor">
                <div className="flex block mx-auto w-full h-full md:w-1/2 md:h-1/2 mb-10">
                    <img className="w-full m-auto object-fill" src={sponsor.fields['Img']}></img>
                </div>
            </div>)}
        </div>
    )
}
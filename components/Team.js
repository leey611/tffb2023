export default function Team(props) {
    const { team, language } = props;

    return (
        <ul className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center lg:justify-between">
            {team?.map((member) => {
                const imgURL = member.fields["Img"]
                    ? member.fields["Img"].replace(/&dl=0(?!.*&dl=0)/, "&raw=1")
                    : ("../img/hero2Img.png");

                return (
                    <li className="w-[250px] flex-col" key={team.id}>
                        <div className="w-full h-[250px] overflow-hidden">
                            <img className={`w-full h-full ${member.fields["Img"] ? 'object-cover': '' } filter grayscale contrast-120`} src={imgURL} alt="" />
                        </div>
                        <h4 className="mt-5 text-h4 font-sans font-semibold">
                            {member.fields[`Title_${language}`]}
                        </h4>
                        <p className="text-b1 font-sans font-medium">
                            {member.fields[`Position_${language}`]}
                        </p>
                        <p className="text-b1 font-sans font-medium">
                            {member.fields[`Email`]}
                        </p>
                    </li>
                );
            })}
        </ul>
    );
}

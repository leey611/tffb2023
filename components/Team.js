export default function Team(props) {
    const { team, language } = props
    
    return (
        <ul className="grid grid-cols-3 gap-8 pt-10 text-center">
            {team?.map(member =><li className="member">
                <div className="flex block mx-auto w-[5rem] h-[5rem] mb-10">
                <img className="w-full m-auto object-fill" src={member.fields[`Img`]}></img>
                </div>
                <h4 className="hidden md:block lg:block">{member.fields[`Title_${language}`]}</h4>
            </li>)}
        </ul>
    )
}
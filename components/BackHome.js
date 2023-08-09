import Link from 'next/link';
import { sectionTitles } from '../utils/helpers';

const BackHome = ({ link, language }) => {

    return (
        <div className="my-20 md:my-16"><Link href={link} className="text-h3 font-special px-10 py-3 md:py-5 border-2 rounded-full border-black">{String.fromCharCode(8592)} {sectionTitles[language].backHome}</Link></div>
    );
};

export default BackHome;
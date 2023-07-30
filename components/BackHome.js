import Link from 'next/link';
import { sectionTitles } from '../utils/helpers';

const CroppedImage = ({ link, language }) => {

    return (
        <div className="my-20"><Link href={link} className="text-h3 font-special px-10 py-5 border-4 rounded-full border-black">{String.fromCharCode(8592)} {sectionTitles[language].backHome}</Link></div>
    );
};

export default CroppedImage;
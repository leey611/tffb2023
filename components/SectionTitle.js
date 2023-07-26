import OpeningClosingFilmLabel from './OpeningClosingFilmLabel'
import localFont from 'next/font/local'
import '../app/film.scss'
import { formatBerlinTime, sectionTitles } from '../utils/helpers'

export default function SectionTitle(props) {
    const  { content } = props
  
    return (
    <div className="mt-[6rem] mb-[1rem]">
        <h2 className="font-special text-primary text-h2 font-semibold">{content}</h2>
    </div>
  );
};

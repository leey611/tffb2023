import OpeningClosingFilmLabel from './OpeningClosingFilmLabel'
import localFont from 'next/font/local'
import '../app/film.scss'
import { formatBerlinTime, sectionTitles } from '../utils/helpers'

export default function SectionTitle(props) {
    const  { content } = props
  
    return (
    <div>
        <h2 className="font-special text-primary text-h2">{content}</h2>
    </div>
  );
};

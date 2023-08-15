import '../globals.css'
import '../style.scss'
import { validateLanguage } from '../../utils/helpers';
import HomeView from '../../components/HomeView';

export default async function Page({ params }) {
  const lang = validateLanguage(params.language) ? params.language : 'en'

  return (
    <>
      <HomeView language={lang}/>
    </>
  );
}



import Link from 'next/link'

export default function LanguageSelect({link = ['/', '/de', '/tw']}) {

  return (
    <div className="navbar flex justify-center w-full font-special text-h2 py-10 z-50">
      <Link href={link[0] || '/'}>EN</Link>/
      <Link href={link[1] || '/de'} >DE</Link>/
      <Link href={link[2] || '/tw'}>TW</Link>
    </div>
  );
};

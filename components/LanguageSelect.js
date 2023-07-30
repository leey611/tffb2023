

import Link from 'next/link'

export default function LanguageSelect() {

  return (
    <div className="navbar flex justify-center w-full font-special text-h2 py-10">
      <Link href="/">EN</Link>/
      <Link href="/de">DE</Link>/
      <Link href="/tw">TW</Link>
    </div>
  );
};

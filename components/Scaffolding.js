import { Roboto } from 'next/font/google'
import { htmlLanguages } from '../utils/helpers';
const roboto = Roboto({
  weight: ['100', '500', '700'],
  subsets: ['latin'],
})
export default function Scaffold(props) {
  return (
    <html lang={htmlLanguages[props.lang] || 'en'}>
      <body className={roboto.className}>
        { props.children }
      </body>
    </html>
  );
};

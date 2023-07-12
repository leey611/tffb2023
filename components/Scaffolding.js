import { Roboto } from 'next/font/google'
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})
export default function Scaffold(props) {
  return (
    <html lang={props.lang}>
      <body className={roboto.className}>
        { props.children }
      </body>
    </html>
  );
};

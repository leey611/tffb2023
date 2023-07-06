import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
    console.log('This is _document.js')
  return (
    <Html lang='de'>
        <Head>
            <title>
            this is different head
            </title>
        </Head>
      {/* <Head /> */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {

  return (
    <Html lang='de'>
        <Head>
            {/* <title>
            this is different head
            </title> */}
        </Head>
      {/* <Head /> */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
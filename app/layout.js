import './globals.css'


export default function RootLayout({ children, params }) {
  console.log(params);
    return (
      // children
      <html lang={params.lang}>
        <body>{children}</body>
      </html>
    )
  }

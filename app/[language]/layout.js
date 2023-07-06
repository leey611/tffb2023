import '../globals.css'

export default function RootLayout({ children, params }) {
    return (
        <div>{params.language}</div>
        // <html lang={params.language}>
        //     <body>
        //         <div>{params.language}</div>
        //     </body>
        // </html>
      
    )
  }
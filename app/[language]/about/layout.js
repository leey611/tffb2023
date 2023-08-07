import '../../globals.css'


export default function RootLayout({ children, params }) {

    return (
        // children
        <html>
          <body>{children}</body>
        </html>
    )
}

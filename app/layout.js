import './globals.css'


export default function RootLayout({ children, params }) {
    return (
      // children
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }
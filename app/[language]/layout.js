import '../globals.css'
import Scaffolding from '../../components/Custom_scaffold'

export default function RootLayout({ children, params }) {
    return (
      <Scaffolding lang={params.language}>
        { children }
      </Scaffolding>
        // <html lang={params.language}>
        //     <body>
        //         <div>{params.language}</div>
        //     </body>
        // </html>
      
    );
  }

import { htmlLanguages, validateLanguage, sectionTitles } from '../utils/helpers';


export default function Scaffold(props) {
  const title = validateLanguage(props.lang) ? sectionTitles[props.lang].siteTitle : sectionTitles['en'].siteTitle
  return (
    <html lang={htmlLanguages[props.lang] || 'en'}>
      <head>
        <title>{title}</title>
        <link rel="icon" href="img/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon?apple-touch-icon.png" type="image/png" sizes="180x180"/>
        <link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png" />
        <link rel="manifest" href="img/site.webmanifest" />
        <link rel="mask-icon" href="img/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
        <meta property="og:image" content="img/opengraph.jpg" />
      </head>
      <body className="font-sans">
        { props.children }
      </body>
    </html>
  );
};

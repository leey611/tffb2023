export default function Scaffold(props) {
  return (
    <html lang={props.lang}>
      <body>
        { props.children }
      </body>
    </html>
  );
};

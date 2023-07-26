'use client'

import { useEffect, useRef, useState } from 'react';

const ResponsiveIframe = () => {
  const iframeRef = useRef(null);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    const resizeHandler = () => {
      if (iframeRef.current) {
        setIframeKey((prevKey) => prevKey + 1);
      }
    };

    // Initial resize on component mount
    resizeHandler();

    // Add event listener for window resize
    window.addEventListener('resize', resizeHandler);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [iframeKey]);

  return (
    <iframe
      ref={iframeRef}
      key={iframeKey}
      src="https://munusshih.github.io/tffb_hero/"
      className="fixed t-0 l-0 w-screen h-screen inset-0 border-none overflow-hidden z-100"
      title="Responsive Iframe"
    ></iframe>
  );
};

export default ResponsiveIframe;

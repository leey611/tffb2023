'use client'
import React, { useRef, useEffect, useState } from 'react'
import p5 from 'p5'

const P5Wrapper = ({
    sketch,
    autoResizeToWindow = true,
    children,
    fallback
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const wrapperElement = useRef(null);

    useEffect(() => {
        const onComplete = () => setIsLoading(false);

        console.log('TEST CANVAS: P5 Setup')

        const canvas = new p5(sketch(onComplete), wrapperElement.current);

        if (autoResizeToWindow) {
            canvas.windowResized = () => {
                canvas.resizeCanvas(canvas.windowWidth, canvas.windowHeight);
            };
        }

        return () => canvas.remove();
    }, [sketch, autoResizeToWindow]);

    return (
        <>
            {isLoading && <div>Canvas still loading</div>}
            <div ref={wrapperElement} />
            {children}
        </>
    );
};

const sketch = (onComplete) => (p5) => {
    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight)
    }
    p5.draw = () => {
        p5.background(250);
        // p5.normalMaterial();
        p5.push();
        p5.fill('red')
        p5.circle(100, 100, 50)
        // p5.rotateZ(p5.frameCount * 0.01);
        // p5.rotateX(p5.frameCount * 0.01);
        // p5.rotateY(p5.frameCount * 0.01);
        // p5.plane(100);
        p5.pop();

        console.log('TEST CANVAS: Finished Drawing');

        onComplete();
    };
}

export default function Testp5Two() {
    return (
        
         <P5Wrapper sketch={sketch}/>
    )
}
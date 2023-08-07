'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Engine, World, Bodies, Composite, Render, Mouse, MouseConstraint, MatterAttractors } from "matter-js";
import ResponsiveIframe from '../ResponsiveIframe';
import p5 from 'p5';
import * as url1 from "./img/il1.png";
import * as url2 from "./img/il2.png";
import * as url3 from "./img/il3.png";
import * as url4 from "./img/il4.png";





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
        console.log(wrapperElement);
        if (autoResizeToWindow) {
            canvas.windowResized = () => {
                canvas.resizeCanvas(canvas.windowWidth, canvas.windowHeight);
            };
        }

        return () => canvas.remove();
    }, [sketch, autoResizeToWindow]);

    return (
        <>
            {isLoading && <div></div>}
            {/* {<ResponsiveIframe />} */}
            <div ref={wrapperElement} />
            {children}
        </>
    );
};
let il1;
const sketch = (onComplete) => (p5) => {

    class Illustration {
        constructor(img, pos, aPos, gravityScale){
            this.acc = pos.sub(aPos) * gravityScale;
            this.vel = p5.createVector(0, 0);
            this.position = pos;
            this.img = img;
            this.maxspeed = 3; 
        }
    
        update(){
            this.vel.add(this.acc);
            this.vel.limit(this.maxspeed);
            this.position.add(this.vel);
        }
    
        render(){
            // p5.image(this.img, this.position.x, this.position.y);
            p5.image(this.img, this.pos.x, this.pos.y);
        }
    }

    // Sketch global Variables
    let illu1, illu2, illu3, illu4;
    let gravityScale = 0.01;
    let ySpeed = 0;
    let yPos = -50;

    // console.log(url1.default.src)
    // console.log(Engine)

    p5.preload = () => {
      illu1 = p5.loadImage(url1.default.src);
      illu2 = p5.loadImage(url2.default.src);
      illu3 = p5.loadImage(url3.default.src);
      illu4 = p5.loadImage(url4.default.src);
    }

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight)
        p5.frameRate(30)
        p5.pixelDensity(1)
        p5.imageMode(p5.CENTER);
        p5.print(p5.width, p5.height);
        il1 = new Illustration(
            illu1, 
            p5.createVector(100, 100),
            p5.createVector(1400, 900),
            1);
    }
    p5.draw = () => {
        // p5.background(255);
        p5.clear();

        // Gravity and Speed Params
        ySpeed += gravityScale;
        yPos += ySpeed;

        if(yPos + illu1.height/2 > p5.height){
            ySpeed = -ySpeed;
            yPos = p5.height - illu1.height/2; 
        }

        ySpeed *= 0.997;
        // p5.normalMaterial();
        p5.push();
        // p5.image(illu1, 400, yPos);

        //CLASS WITH ATTRACTOR TEST
        // il1.update();
        // il1.render();
        const imgScale = 0.1;
        const img3Scale = 0.2;
        // FLOATING TEST
        // The second constant in Math.min of sizing clamps the size when the windowWidth exceeds text elements' propo 
        p5.image(illu1, p5.width * 3 / 4 + Math.cos(p5.frameCount * 0.035)* 20, p5.height / 2 + Math.sin(p5.frameCount * 0.02)* 50, 
                 Math.min(imgScale * p5.windowWidth, 160), Math.min(imgScale*illu1.height*p5.windowWidth/illu1.width, 160*illu1.height/illu1.width));
        p5.image(illu2, p5.width * 1.2 / 4 + Math.cos(p5.frameCount * 0.015)* 14, p5.height / 3.7 + Math.sin(p5.frameCount * 0.013)* 30,
                 Math.min(imgScale * p5.windowWidth, 140), Math.min(imgScale*illu2.height*p5.windowWidth/illu2.width, 140*illu2.height/illu2.width));
        p5.image(illu3, p5.width * 0.8 / 4 + Math.cos(p5.frameCount * 0.011)* 20, p5.height * 2.9 / 4  + Math.sin(p5.frameCount * 0.007)* 40,
                 Math.min(img3Scale * p5.windowWidth, 340), Math.min(img3Scale*illu3.height*p5.windowWidth/illu3.width, 340*illu3.height/illu3.width));
        // p5.image(illu4, 1100 + Math.cos(p5.frameCount * 0.025)* 20, 900 + Math.sin(p5.frameCount * 0.009)* 60);
        
        p5.pop();

        // console.log('TEST CANVAS: Finished Drawing');
        onComplete();
    };
}




export default function Testp5Two() {
    return (
        
         <P5Wrapper sketch={sketch}/>
    )
}
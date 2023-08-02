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
        // if (autoResizeToWindow) {
        //     canvas.windowResized = () => {
        //         canvas.resizeCanvas(canvas.windowWidth, canvas.windowHeight);
        //     };
        // }

        // return () => canvas.remove();
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
            p5.image(this.img, 400, 400);
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

        il1 = new Illustration(
            illu1, 
            p5.createVector(100, 100),
            p5.createVector(1400, 900),
            1);
    }
    p5.draw = () => {
        p5.background(255);

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
        
        // FLOATING TEST
        p5.image(illu1, 1000 + Math.cos(p5.frameCount * 0.035)* 20, 400 + Math.sin(p5.frameCount * 0.02)* 50);
        p5.image(illu2, 250 + Math.cos(p5.frameCount * 0.015)* 14, 300 + Math.sin(p5.frameCount * 0.013)* 30);
        p5.image(illu3, 400 + Math.cos(p5.frameCount * 0.05)* 20, 600 + Math.sin(p5.frameCount * 0.03)* 40);
        p5.image(illu4, 700 + Math.cos(p5.frameCount * 0.075)* 20, 700 + Math.sin(p5.frameCount * 0.027)* 60);
        
        // p5.image(illu3, 700, 700);
        // p5.image(illu4, 0, 260);
        // p5.rotateZ(p5.frameCount * 0.01);
        // p5.rotateX(p5.frameCount * 0.01);
        // p5.rotateY(p5.frameCount * 0.01);
        // p5.plane(100);
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
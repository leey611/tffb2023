'use client'
import React, { useRef, useEffect } from 'react'
import p5 from 'p5'

const Testp5Three = () => {
    const myRef = useRef(null)
    useEffect(() => {
        
    })

    const Sketch = (p5) => {
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
        };
    }
}
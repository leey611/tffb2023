'use client'
import { useState } from "react"

export default function Modal(props) {
    const [text, setText] = useState('test string')
    
    return(
        <div>{text}</div>
    )
    
}
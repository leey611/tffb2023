'use client'
import { useState } from "react"
import RichText from "./RichText"
import { sectionTitles } from "../utils/helpers"
export default function Bank({ bank, language }) {
    const Title = bank.fields[`Title_${language}`]
    const Subtitle = bank.fields[`Subtitle_${language}`]
    const Content = bank.fields[`Content_${language}`]
    const infoTitle = sectionTitles[language]
    const {
        bankName,
        swiftCode,
        accountNumber,
        accountName,
        accountAddress,
        accountTel,
        accountEmail,
    } = infoTitle
    const {
        BankName,
        SwiftCode,
        AccountNumber,
        AccountName,
        AccountAddress,
        AccountTel,
        AccountEmail,
    } = bank.fields
    
    return (
        <>
            <h1 className="font-special font-medium text-h1 text-primary text-center my-8">{Title}</h1>
            <img src='../img/about-img.png' className='block w-20 md:w-36 mx-auto my-24'/>
            <div className="py-8"><RichText content={Content}/></div>
            <h3 className="font-special font-medium text-h2 text-primary text-center my-8">{Subtitle}</h3>
            <div>
                <Copyable title={bankName} content={BankName}/>
                <Copyable title={swiftCode} content={SwiftCode}/>
                <Copyable title={accountNumber} content={AccountNumber}/>
                <Copyable title={accountName} content={AccountName}/>
                <Copyable title={accountAddress} content={AccountAddress}/>
                <Copyable title={accountTel} content={AccountTel}/>
                <Copyable title={accountEmail} content={AccountEmail} classNames={'border-b'}/>
            </div>
        </>
    )
}

function Copyable({ title, content, classNames }) {
    const [isCopied, setIsCopied] = useState(false)
    const copyToClipboard = (content) => {
        navigator.clipboard.writeText(content)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 5000);
    }
    return (
        <div className={`grid grid-cols-2 border-t border-tertiary p-4 ${classNames ? classNames : ''}`}>
            <div className="font-sans font-bold">{title}</div>
            <div className="flex justify-between cursor-pointer" onClick={() => copyToClipboard(content)}>
                <div className="font-sans font-bold break-all">{content}</div>
                <div className="shrink-0">
                {   isCopied ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                :   <svg 
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                    </svg>           
                }
                </div>
            </div>
            
        </div>
    )
}
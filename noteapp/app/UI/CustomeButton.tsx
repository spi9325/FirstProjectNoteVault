import { MouseEventHandler } from "react";

interface ButtonType{
    text?:string;
    onClick?:MouseEventHandler;
    width?:string;
    height?:string;
    textSize?:string;
    textColor?:string;
    
}

export function CustomeButton({text,onClick,width,height,textSize,textColor}:ButtonType){
    
    return <button onClick={onClick} className={`bg-black p-1 px-4 rounded-lg ${textColor} transition-shadow duration-100 hover:shadow-blue ${textSize} ${width} ${height} `}>{text}</button>
}
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface propsType {
    title?: string;
    description?: string;
    noteNo?: number;
    buttonText?: string;
    updateFn?: (titleVal: string, descriptionVal: string,noteNo?:number) => void;
    
}


export function NoteDiv({ title, description, buttonText, noteNo, updateFn }: propsType) {
    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const [titleVal, setTitleVal] = useState(title ?? "");
    const [descriptionVal, setDescriptionVal] = useState(description ?? "");
    
    useEffect(() => {
        setTitleVal(title ?? "");
        setDescriptionVal(description ?? "");
    }, [title, description]);


    function handelTitle(event: ChangeEvent<HTMLInputElement>): void {
        setTitleVal(event.target.value)
    }
    function handelDescription(event: ChangeEvent<HTMLTextAreaElement>): void {
        setDescriptionVal(event.target.value);
    }

    function handelSubmit() {
        titleVal && descriptionVal && updateFn ? updateFn(titleVal, descriptionVal,noteNo) : null
    }
    return (
        <>

            <div className="mt-[100px] md:mt-0 w-[80%] mx-auto flex flex-col  justify-center items-center">
                <label className=" font-semibold">Title:</label>
                <input ref={titleRef} value={titleVal} required onChange={handelTitle} className="rounded p-1 w-[80%] outline-dashed bg-slate-200" type="text"  />
            </div>
            <div className=" w-[100%] mt-[20px] bg-black p-3 h-[auto] rounded-xl relative overflow-y-hidden">
                <div className=" bg-white border rounded-xl w-[100%] pt-3 px-1">
                    <textarea
                        required
                        value={descriptionVal}
                        onChange={handelDescription}
                        placeholder="Type your notes here..."
                        spellCheck={false}
                        ref={descriptionRef}
                        style={{
                            width: '100%',
                            height: '400px',
                            fontSize: '16px',
                            resize: 'vertical',
                            outline: 'none',
                            paddingInline: '3px',
                            overflow: 'auto',
                        }}
                    />
                </div>
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 bg-black text-white text-center w-[90px] rounded-b-lg cursor-pointer">
                    <button onClick={handelSubmit}>{buttonText}</button>
                </div>

            </div>
        </>
    )
}
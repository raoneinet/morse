"use client"
import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { morse } from "@/utils/morse"
import { MorseTypes } from "@/types/morseTypes"

export const Inputs = () => {

    const [translation, setTranslation] = useState<MorseTypes>()
    const [text, setText] = useState("")
    const [isDisabled, setDisabled] = useState(true)
    const { register, handleSubmit } = useForm()

    const handleChange = (e: any)=>{
        setText(prev => prev + e.target.value)
        console.log(text)
    }

    const handleWrite = (code: MorseTypes) => {
        setText(prev => prev + code.alphabet)
        setTranslation(prev => ({ alphabet: code.alphabet, code: (prev?.code || "") + code.code + " " }))
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const letter = e.key.toLowerCase();

        if (letter.length === 1 && /[a-zA-Z0-9]/.test(letter)) {
            const morseCode = morse.find(item => item.alphabet === letter);
            if (morseCode) {
                handleWrite(morseCode);
            }
        }

        if (e.key === "Backspace") {
            setText(prev => prev.slice(0, -1));
            setTranslation(prev => {
                if (!prev?.code) return undefined;
                const codes = prev.code.trim().split(" ");
                codes.pop();
                return {
                    alphabet: prev.alphabet,
                    code: codes.join(" ") + (codes.length > 0 ? " " : "")
                };
            });
        }
    };




    return (
        <div className="w-full p-5">
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap justify-center w-full gap-1">
                    {morse?.map((item, index) => (
                        <div key={index} onClick={() => handleWrite(item)}
                            className="w-7 border border-y-violet-900 bg-violet-500 rounded-lg text-center text-white font-bold cursor-pointer">
                            {item.alphabet}
                        </div>
                    )
                    )}
                </div>
            </div>
            <form className="flex flex-col gap-3">
                <label>
                    <p>Text</p>
                    <textarea
                        {...register("text")}
                        className="p-3 border border-gray-400 w-full rounded-md"
                        value={text}
                        onKeyUp={handleKeyPress}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <p>Translation</p>
                    <textarea
                        {...register("translation")}
                        disabled={isDisabled}
                        className={`text-xl p-3 border border-gray-400 w-full rounded-md outline-0 ${isDisabled && "bg-gray-300"}`}
                        value={translation?.code}
                    />
                </label>
            </form>
        </div>
    )
}
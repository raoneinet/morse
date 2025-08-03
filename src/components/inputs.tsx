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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        const lastChar = newValue[newValue.length - 1]?.toLowerCase();
        const isBackspace = newValue.length < text.length;

        if (isBackspace) {
            setText(newValue);
            setTranslation(prev => {
                if (!prev?.code) return undefined;
                const codes = prev.code.trim().split(" ");
                codes.pop();
                return {
                    alphabet: prev.alphabet,
                    code: codes.join(" ") + (codes.length > 0 ? " " : "")
                };
            });
        } else if (/[a-zA-Z0-9]/.test(lastChar)) {
            const morseCode = morse.find(item => item.alphabet === lastChar);
            if (morseCode) {
                setText(newValue);
                setTranslation(prev => ({
                    alphabet: morseCode.alphabet,
                    code: (prev?.code || "") + morseCode.code + " "
                }));
            } else {
                setText(newValue); // sem tradução
            }
        } else {
            setText(newValue); // outros caracteres
        }
    };




    return (
        <div className="w-full p-5">
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap justify-center w-full gap-1">
                    {morse?.map((item, index) => (
                        <div key={index}
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
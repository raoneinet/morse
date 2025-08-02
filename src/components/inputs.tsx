"use client"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

import { morse } from "@/utils/morse"
import { MorseTypes } from "@/types/morseTypes"

export const Inputs = () => {

    const [translation, setTranslatioin] = useState("")
    const [text, setText] = useState("")
    const [isDisabled, setDisabled] = useState(true)
    const { register, handleSubmit } = useForm()

    const handleWrite = (code: MorseTypes) => {
        setText(code.alphabet)
        setTranslatioin(code.code)
    }

    return (
        <div className="w-full p-5">
            <div className="flex w-full gap-2">
                {morse?.map((item) => (
                    <div onClick={() => handleWrite(item)}
                        className="flex-1 border border-y-violet-900 bg-violet-500 rounded-lg text-center text-white font-bold cursor-pointer">
                        {item.alphabet}
                    </div>
                )
                )}
            </div>
            <form className="flex flex-col gap-3">
                <label>
                    <p>Text</p>
                    <textarea 
                        {...register("text")} className="p-3 border border-gray-400 w-full rounded-md outline-0" 
                        value={text}
                    />
                </label>
                <label>
                    <p>Translation</p>
                    <textarea
                        {...register("translation")}
                        disabled={isDisabled}
                        className={`p-3 border border-gray-400 w-full rounded-md outline-0 ${isDisabled && "bg-gray-300"}`}
                        value={translation}
                    />
                </label>
            </form>
        </div>
    )
}
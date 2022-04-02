import clsx from "clsx";
import React, { useEffect, useState } from "react";

interface Props {
    onChange?: (value: string) => void;
    placeholder?: string;
    type?: "number" | "text" | "password" | "email" | "tel" | "url" | "search";
}
const TextField: React.FC<Props> = ({ placeholder = "type", type = "text", onChange }) => {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState("");
    useEffect(() => {
        onChange && onChange(value);
    }, [value]);
    return (
        <div className={clsx("relative mb-6")}>
            {focus && value && (
                <div className={clsx("absolute text-emerald-400 -top-2 left-0", "text-xs font-exo")}>{placeholder}</div>
            )}
            <input
                type={type}
                onFocus={() => setFocus(true)}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className={clsx(
                    "w-full outline-none pt-2 pb-1 text-sky-400 font-track bg-transparent",
                    "border-b border-slate-100",
                    {
                        "border-sky-400": focus || value !== "",
                        "text-right": type === "number",
                    }
                )}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextField;

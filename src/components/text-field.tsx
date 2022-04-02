import clsx from "clsx";
import React, { useEffect, useState } from "react";

interface Props {
    onChange?: (value: string | number) => void;
    placeholder?: string;
    autoFocus?: boolean;
    required?: boolean;
    defaultValue?: string | number;
    type?: "number" | "text" | "password" | "email" | "tel" | "url" | "search";
}
const TextField: React.FC<Props> = ({
    autoFocus,
    placeholder = "type",
    type = "text",
    onChange,
    required = false,
    defaultValue = "",
}) => {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
        onChange && onChange(value);
    }, [onChange, value]);
    return (
        <div className={clsx("relative mb-6")}>
            {(focus || value !== "") && (
                <div
                    className={clsx(
                        "absolute text-emerald-400 -top-2 left-0",
                        "text-xs font-exo"
                    )}
                >
                    {placeholder}
                </div>
            )}
            <input
                type={type}
                required={required}
                autoFocus={autoFocus}
                onFocus={() => setFocus(true)}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className={clsx(
                    "w-full outline-none pt-2 pb-1 font-sans text-slate-100 bg-transparent",
                    "border-b border-sky-100",
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

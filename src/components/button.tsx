import clsx from "clsx";
import React from "react";

interface Props {
    icon?: React.ReactNode;
    className?: string[] | string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<Props> = ({ icon, children, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "flex flex-row justify-center items-center space-x-2 py-2 px-4",
                "rounded-[1.5rem] border-sky-400 border text-white hover:text-sky-900  hover:bg-sky-200 focus:outline-none focus:shadow-outline",
                className
            )}
        >
            {icon}
            <div className="font-track">{children}</div>
        </button>
    );
};

export default Button;

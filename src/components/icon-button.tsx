import clsx from "clsx";
import React, { ReactNode } from "react";

interface Props {
    icon?: ReactNode;
    title?: string;
    onClick?: () => void;
    className?: string;
}
const IconButton: React.FC<Props> = (props) => {
    return (
        <button
            onClick={props.onClick}
            title={props.title}
            className={clsx(
                "flex flex-row space-x-2 items-center",
                "text-sky-100 hover:text-orange-500",
                props.className
            )}
        >
            {props.icon}
            {props.children}
        </button>
    );
};

export default IconButton;

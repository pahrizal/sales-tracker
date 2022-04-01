import clsx from "clsx";
import React from "react";

interface Props {
    picture?: string;
}
const MenuItem: React.FC<Props> = ({ picture = "https://picsum.photos/id/1/128/128?" }) => {
    return (
        <div
            className={clsx(
                "relative rounded-[1rem] w-[240px] h-[320px]",
                "shadow-[0px_0px_4px_#FFFFFF] shadow-lime-500",
                "pt-24 px-4"
            )}
        >
            <img
                className={clsx(
                    "bg-slate-100 rounded-full absolute w-[128px] h-[128px]",
                    "-top-12 left-1/2 -translate-x-[50%]",
                    "shadow-[0px_0px_4px_#FFFFFF] shadow-inherit",
                    "flex flex-col justify-center items-center"
                )}
                src={picture}
                alt="Avatar"
            />
            <div className="">
                <p>Category</p>
                <p>Name</p>
                <p>Options</p>
                <p>Sell Price</p>
                <p>Cost Price</p>
                <p>Stock</p>
            </div>
        </div>
    );
};

export default MenuItem;

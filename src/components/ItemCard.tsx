import clsx from "clsx";
import React, { useRef } from "react";
import AddIcon from "../assets/icons/AddIcon";
import CameraIcon from "../assets/icons/CameraIcon";
import { ItemData } from "../modules/items/item.definition";
import ItemForm from "./ItemForm";

interface Props extends ItemData {
    newItem?: boolean;
}
const ItemCard: React.FC<Props> = ({ newItem, ...rest }) => {
    const [adding, setAdding] = React.useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const handleCreateItem = () => {
        setAdding(true);
    };
    const handleSaveItem = () => {
        setAdding(false);
    };
    const handleClose = () => {
        if (containerRef.current) {
            containerRef.current.classList.add("animate__fadeOut");
            setTimeout(() => {
                setAdding(false);
            }, 1000);
        } else {
            setAdding(false);
        }
    };
    return (
        <div
            ref={containerRef}
            className={clsx("animate__animated", {
                "fixed px-4 top-0 left-0 w-screen h-screen z-20 animate__fadeIn bg-[rgba(0,0,0,0.84)]":
                    newItem && adding,
                "h-max w-full relative": !newItem || !adding,
            })}
        >
            <div
                className={clsx("w-full ", {
                    "absolute rounded-[1rem] bg-slate-900 z-10": newItem && adding,
                    " max-w-[320px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2": newItem && adding,
                    "h-full relative": !newItem || !adding,
                })}
            >
                <div
                    style={{ minHeight: 256 }}
                    className={clsx(
                        "grid-item rounded-[1rem] w-full h-full pb-4",
                        "shadow-[0px_0px_4px_#FFFFFF]",
                        "pt-24 px-4 relative",
                        {
                            "shadow-lime-500 text-lime-400": !newItem || adding,
                            "shadow-slate-400 text-slate-400 hover:shadow-lime-500 hover:text-lime-400":
                                newItem && !adding,
                        }
                    )}
                >
                    <div
                        className={clsx(
                            { "bg-slate-100": !newItem, "bg-slate-800": newItem },
                            "rounded-full absolute w-[128px] h-[128px]",
                            "-top-12 left-1/2 -translate-x-[50%]",
                            "shadow-[0px_0px_4px_#FFFFFF] shadow-inherit",
                            "flex flex-col justify-center items-center"
                        )}
                    >
                        {newItem ? (
                            <CameraIcon />
                        ) : (
                            <img
                                className={clsx("rounded-full absolute w-full h-full")}
                                src={rest.image || "https://picsum.photos/128?" + rest.id}
                                alt="Avatar"
                            />
                        )}
                    </div>
                    {newItem && !adding && (
                        <button
                            onClick={handleCreateItem}
                            title="Create new item"
                            className={clsx(
                                "cursor-pointer ",
                                "flex flex-col h-full w-full justify-center items-center",
                                "text-current"
                            )}
                        >
                            <AddIcon className={clsx()} width={64} height={64} />
                            <p className="font-track">Create new</p>
                        </button>
                    )}
                    {newItem && adding && <ItemForm onClose={handleClose} onSave={handleSaveItem} />}
                    {!newItem && !adding && (
                        <div className="">
                            <p>Category: {rest.category}</p>
                            <p>Name: {rest.name}</p>
                            <p>Description: {rest.description}</p>
                            <p>Sell Price: {rest.price.sell}</p>
                            <p>Cost Price: {rest.price.buy}</p>
                            <p>
                                Stock: {rest.stock.current},{rest.stock.min}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemCard;

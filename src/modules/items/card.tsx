import clsx from "clsx";
import React, { useContext } from "react";
import AddIcon from "../../assets/icons/AddIcon";
import CameraIcon from "../../assets/icons/CameraIcon";
import EditIcon from "../../assets/icons/edit";
import TrashIcon from "../../assets/icons/trash";
import IconButton from "../../components/icon-button";
import { firebaseAuth } from "../firebase";
import itemContext from "./context";
import { iItemContext, ItemData } from "./definition";
import ItemService from "./service";

export default function ItemCard(props: ItemData) {
    const { setAdding, setEditing, setItem } =
        useContext<iItemContext>(itemContext);
    const handleRemove = React.useCallback(() => {
        const user = firebaseAuth.currentUser;
        if (!user || !props.id) return;
        const itemService = new ItemService(user.uid);
        itemService.remove(
            String(props.id),
            () => {},
            (err) => {}
        );
    }, [props.id]);
    const handleEdit = React.useCallback(() => {
        setEditing(true);
        setItem(props);
    }, [props, setEditing, setItem]);

    return (
        <div
            style={{ maxHeight: 280 }}
            className={clsx(
                "grid-item rounded-[1rem] w-full h-full pb-10",
                "pt-20 px-4 relative mt-8 pb-6",
                "bg-gradient-to-r from-sky-500 to-sky-700",
                "border-slate-900"
            )}
        >
            <div
                className={clsx(
                    "bg-slate-800",
                    "rounded-full absolute w-[128px] h-[128px]",
                    "-top-12 left-1/2 -translate-x-[50%]",
                    "border-8 border-inherit",
                    "flex flex-col justify-center items-center"
                )}
            >
                {props.id ? (
                    <img
                        className={clsx("rounded-full absolute w-full h-full")}
                        src={
                            props.image ||
                            "https://picsum.photos/128?" + props.id
                        }
                        alt="ItemImage"
                    />
                ) : (
                    <CameraIcon />
                )}
            </div>
            {props.id ? (
                <div className="font-sans z-10">
                    <h1 className="font-exo text-center text-white text-2xl font-bold text-lime-400">
                        {props.name}
                    </h1>
                    <div className="text-center w-full font-sans font-italic mt-2 h-[30px] text-white">
                        <p className="text-[10px] text-ellipsis overflow-hidden">
                            {props.description}
                        </p>
                    </div>
                    <div className="flex flex-row space-x-4 justify-start mt-4">
                        <div className="flex flex-col w-[110px] text-xs">
                            <p>Sell Price:</p>
                            <h2 className="text-md text-lime-400 font-bold">
                                {props.price.sell.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </h2>
                        </div>
                        <div className="flex flex-col w-[110px] text-xs">
                            <p>Buy Price:</p>
                            <h2 className="text-md text-lime-400  font-bold">
                                {props.price.buy.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </h2>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-4 justify-start mt-4">
                        <div className="flex flex-col w-[110px] text-xs">
                            <p>Current Stock:</p>
                            <h2 className="text-md text-lime-400 font-bold">
                                {props.stock.current.toFixed(0)}
                            </h2>
                        </div>
                        <div className="flex flex-col w-[110px] text-xs">
                            <p>Minimum Stock:</p>
                            <h2 className="text-md text-lime-400 font-bold">
                                {props.stock.min.toFixed(0)}
                            </h2>
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setAdding(true)}
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
            {props.id && (
                <div
                    className={clsx(
                        "flex flex-row justify-between px-6 items-center",
                        "rounded-b-[24px] w-[132px] h-[40px]",
                        "bg-gradient-to-r from-sky-500 to-sky-700",
                        "absolute -bottom-[40px] left-1/2 -translate-x-1/2"
                    )}
                >
                    <IconButton
                        onClick={() => handleRemove()}
                        title="Remove"
                        icon={<TrashIcon fill="currentColor" />}
                    ></IconButton>
                    <IconButton
                        title="Edit"
                        onClick={handleEdit}
                        icon={<EditIcon fill="currentColor" />}
                    ></IconButton>
                </div>
            )}
        </div>
    );
}

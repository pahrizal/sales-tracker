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
                "pt-24 px-4 relative mt-8 pb-6",
                "bg-sky-700",
                "border-sky-700"
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
                <div className="">
                    <p>Category: {props.category}</p>
                    <p>Name: {props.name}</p>
                    <p>Description: {props.description}</p>
                    <p>Sell Price: {props.price.sell}</p>
                    <p>Cost Price: {props.price.buy}</p>
                    <p>
                        Stock: {props.stock.current},{props.stock.min}
                    </p>
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
                        "flex flex-row justify-between px-6 items-end pb-2",
                        "rounded-[24px] w-[132px] h-[64px]",
                        "bg-inherit",
                        "absolute -bottom-[18px] right-0"
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

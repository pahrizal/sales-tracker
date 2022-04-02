import clsx from "clsx";
import React, { useContext, useRef } from "react";
import useAuth from "../../hooks/auth";
import { firebaseAuth } from "../firebase";
import { iItemContext, ItemData } from "./definition";
import ItemService from "./service";
import Button from "../../components/button";
import TextField from "../../components/text-field";
import CameraIcon from "../../assets/icons/CameraIcon";
import itemContext from "./context";

interface Props {
    onClose?: () => void;
    onSave?: () => void;
}
const emptyData: ItemData = {
    category: "",
    name: "",
    price: {
        sell: 0,
        buy: 0,
    },
    stock: {
        current: 0,
        min: 0,
    },
    description: "",
    image: "",
};
const ItemForm: React.FC<Props> = ({ onClose, onSave }) => {
    const { user } = useAuth();
    const { adding, setAdding, setEditing, setItem, item, editing } =
        useContext<iItemContext>(itemContext);
    const containerRef = useRef<HTMLDivElement>(null);
    const itemService = new ItemService(user?.uid);
    const [data, setData] = React.useState<ItemData>({ ...emptyData });
    const handleSaveItem = () => {
        const user = firebaseAuth.currentUser;
        if (!user) return;
        itemService.setOwner(user.uid);
        if (adding) {
            itemService.create(
                data,
                (val) => {
                    handleClose();
                },
                (err) => {}
            );
        } else {
            itemService.update(
                data,
                () => {
                    handleClose();
                },
                (err) => {}
            );
        }
    };
    const handleClose = () => {
        if (containerRef.current) {
            containerRef.current.classList.add("animate__fadeOut");
            setAdding(false);
            setEditing(false);
            setItem(null);
        }
    };
    React.useEffect(() => {
        if (item) {
            setData({ ...item });
        }
    }, [editing, item]);
    return !adding && !editing ? (
        <></>
    ) : (
        <div
            ref={containerRef}
            className={clsx(
                "animate__animated",
                "h-screen w-screen fixed",
                "left-0 top-0",
                "backdrop-blur-[24px]"
            )}
        >
            <div
                style={{ minHeight: 256 }}
                className={clsx(
                    "grid-item rounded-[1rem] w-[320px] h-max pb-10",
                    "pt-20 px-6 absolute",
                    "bg-sky-700",
                    "border-sky-700",
                    "left-1/2 top-1/2",
                    "-translate-x-1/2 -translate-y-1/2"
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
                    <CameraIcon />
                </div>
                <div className="">
                    <p className="font-exo text-xl mb-4 text-center">
                        Create New Item
                    </p>
                    <TextField
                        autoFocus
                        placeholder="Category"
                        defaultValue={item?.category || ""}
                        required
                        onChange={(val) =>
                            setData({ ...data, category: String(val) })
                        }
                    />
                    <TextField
                        required
                        defaultValue={item?.name || ""}
                        placeholder="Item name"
                        onChange={(val) =>
                            setData({ ...data, name: String(val) })
                        }
                    />
                    <TextField
                        placeholder="Description"
                        defaultValue={item?.description || ""}
                        onChange={(val) =>
                            setData({ ...data, description: String(val) })
                        }
                    />
                    <div className="flex flex-row space-x-4 items-center">
                        <TextField
                            required
                            placeholder="Sell Price"
                            defaultValue={item?.price.sell || 0}
                            type="number"
                            onChange={(val) =>
                                setData({
                                    ...data,
                                    price: { ...data.price, sell: Number(val) },
                                })
                            }
                        />
                        <TextField
                            required
                            placeholder="Buy Price"
                            defaultValue={item?.price.buy || 0}
                            type="number"
                            onChange={(val) =>
                                setData({
                                    ...data,
                                    price: { ...data.price, buy: Number(val) },
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-row space-x-4 items-center">
                        <TextField
                            required
                            placeholder="Current Stock"
                            type="number"
                            defaultValue={item?.stock.current || 0}
                            onChange={(val) =>
                                setData({
                                    ...data,
                                    stock: {
                                        ...data.stock,
                                        current: Number(val),
                                    },
                                })
                            }
                        />
                        <TextField
                            placeholder="Mininum Stock"
                            type="number"
                            defaultValue={item?.stock.min || 0}
                            onChange={(val) =>
                                setData({
                                    ...data,
                                    stock: { ...data.stock, min: Number(val) },
                                })
                            }
                        />
                    </div>
                    <div className="w-full flex flex-row items-center justify-between mt-6">
                        <Button
                            onClick={handleClose}
                            className={clsx(
                                "text-current border-slate-500 text-slate-500",
                                "hover:bg-slate-300"
                            )}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveItem}
                            className={clsx("text-current border-current")}
                        >
                            {editing ? "Save" : "Create"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemForm;

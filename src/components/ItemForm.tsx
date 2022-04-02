import clsx from "clsx";
import React from "react";
import useAuth from "../hooks/authHook";
import { firebaseAuth } from "../modules/firebase";
import { ItemData } from "../modules/items/item.definition";
import ItemService from "../modules/items/item.service";
import Button from "./Button";
import TextField from "./TextField";
interface Props {
    onClose?: () => void;
    onSave?: () => void;
}
const ItemForm: React.FC<Props> = ({ onClose, onSave }) => {
    const { user } = useAuth();
    const itemService = new ItemService(user?.uid);
    const [data, setData] = React.useState<ItemData>({
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
    });
    const handleSaveItem = () => {
        const user = firebaseAuth.currentUser;
        if (!user) return;
        itemService.setOwner(user.uid);
        itemService.create(
            data,
            (val) => {
                onSave && onSave();
            },
            (err) => {}
        );
    };
    const handleClose = () => {
        onClose && onClose();
    };

    return (
        <div className="">
            <p className="font-exo text-xl mb-4 text-center">Create New Item</p>
            <TextField placeholder="Category" onChange={(val) => setData({ ...data, category: val })} />
            <TextField placeholder="Item name" onChange={(val) => setData({ ...data, name: val })} />
            <TextField placeholder="Description" onChange={(val) => setData({ ...data, description: val })} />
            <div className="flex flex-row space-x-4 items-center">
                <TextField
                    placeholder="Sell Price"
                    type="number"
                    onChange={(val) => setData({ ...data, price: { ...data.price, sell: Number(val) } })}
                />
                <TextField
                    placeholder="Buy Price"
                    type="number"
                    onChange={(val) => setData({ ...data, price: { ...data.price, buy: Number(val) } })}
                />
            </div>
            <div className="flex flex-row space-x-4 items-center">
                <TextField
                    placeholder="Current Stock"
                    type="number"
                    onChange={(val) => setData({ ...data, stock: { ...data.stock, current: Number(val) } })}
                />
                <TextField
                    placeholder="Mininum Stock"
                    type="number"
                    onChange={(val) => setData({ ...data, stock: { ...data.stock, min: Number(val) } })}
                />
            </div>
            <div className="w-full flex flex-row items-center justify-between mt-6">
                <Button
                    onClick={handleClose}
                    className={clsx("text-current border-slate-500 text-slate-500", "hover:bg-slate-300")}
                >
                    Cancel
                </Button>
                <Button onClick={handleSaveItem} className={clsx("text-current border-current")}>
                    Add Item
                </Button>
            </div>
        </div>
    );
};

export default ItemForm;

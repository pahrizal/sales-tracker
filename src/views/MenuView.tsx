import clsx from "clsx";
import React from "react";
import ItemCard from "../components/ItemCard";
import { firebaseAuth } from "../modules/firebase";
import { ItemData, ItemEvent } from "../modules/items/item.definition";
import ItemService from "../modules/items/item.service";

const MenuView = () => {
    const [items, setItems] = React.useState<ItemData[]>([]);
    React.useEffect(() => {
        const user = firebaseAuth.currentUser;
        if (!user) return;
        const itemService = new ItemService(user.uid);
        itemService.on(
            ItemEvent.change,
            (snapshot) => {
                const data = snapshot.val();
                const mappedItems = Object.keys(data).map((k) => {
                    const item: ItemData = {
                        ...data[k],
                        id: k,
                    };
                    return item;
                });
                setItems(mappedItems);
            },
            (err) => {}
        );
    }, []);
    return (
        <section
            className={clsx(
                "",
                "w-screen animate__animated animate__fadeIn h-full overflow-y-auto",
                "p-8 pt-16 justify-center pb-16"
            )}
        >
            <div
                className={clsx(
                    "w-full h-full relative",
                    "grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-16",
                    "p-4 justify-center"
                )}
            >
                <ItemCard
                    newItem
                    category={""}
                    name={""}
                    price={{
                        sell: 0,
                        buy: 0,
                    }}
                    stock={{
                        current: 0,
                        min: 0,
                    }}
                    description={""}
                    image={""}
                />
                {items.map((item) => (
                    <ItemCard key={item.id} {...item} />
                ))}
            </div>
        </section>
    );
};

export default MenuView;

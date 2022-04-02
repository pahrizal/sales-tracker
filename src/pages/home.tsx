import clsx from "clsx";
import React from "react";
import { firebaseAuth } from "../modules/firebase";
import NewItemCard from "../modules/items/card";
import { ItemData, ItemEvent } from "../modules/items/definition";
import ItemForm from "../modules/items/form";
import ItemContext from "../modules/items/context";
import ItemService from "../modules/items/service";

const Home = () => {
    const [items, setItems] = React.useState<ItemData[]>([]);
    const [adding, setAdding] = React.useState(false);
    const [editing, setEditing] = React.useState(false);
    const [item, setItem] = React.useState<ItemData | null>(null);
    React.useEffect(() => {
        const user = firebaseAuth.currentUser;
        if (!user) return;
        const itemService = new ItemService(user.uid);
        itemService.on(
            ItemEvent.change,
            (snapshot) => {
                const data = snapshot.val();
                if (!data) {
                    setItems([]);
                    return;
                }
                const itemKeys = Object.keys(data);
                const mappedItems = itemKeys.map((k) => {
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
        <ItemContext.Provider
            value={{ adding, editing, item, setEditing, setAdding, setItem }}
        >
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
                    <NewItemCard
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
                        <NewItemCard key={item.id} {...item} />
                    ))}
                </div>
            </section>
            <ItemForm />
        </ItemContext.Provider>
    );
};

export default Home;

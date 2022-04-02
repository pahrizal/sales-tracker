import clsx from "clsx";
import React from "react";
import { firebaseAuth } from "../modules/firebase";
import NewItemCard from "../modules/items/card";
import ItemContext from "../modules/items/context";
import { ItemData, ItemEvent } from "../modules/items/definition";
import ItemForm from "../modules/items/form";
import ItemService from "../modules/items/service";

const Home = () => {
    const { items, setItems, filterTag, setFilteredItems, filteredItems } =
        React.useContext(ItemContext);
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
                setFilteredItems(items);
                setItems(mappedItems);
            },
            (err) => {}
        );
    }, [items, setFilteredItems, setItems]);
    React.useEffect(() => {
        if (!filterTag) {
            setFilteredItems(items);
            return;
        }
        const filtered = items.filter((item) => {
            return (
                item.category.toLowerCase().includes(filterTag.toLowerCase()) ||
                item.name.toLowerCase().includes(filterTag.toLowerCase()) ||
                item.description.toLowerCase().includes(filterTag.toLowerCase())
            );
        });
        setFilteredItems(filtered);
    }, [filterTag, items, setFilteredItems]);
    return (
        <>
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
                    {filteredItems.map((item) => (
                        <NewItemCard key={item.id} {...item} />
                    ))}
                </div>
            </section>
            <ItemForm />
        </>
    );
};

export default Home;

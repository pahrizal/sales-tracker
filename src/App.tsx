import clsx from "clsx";
import React, { useState } from "react";
import useAuth from "./hooks/auth";
import { ItemData } from "./modules/items/definition";
import HeaderBox from "./pages/header";
import Home from "./pages/home";
import SearchBox from "./pages/searchbar";
import ItemContext from "./modules/items/context";

function App() {
    const { authenticated } = useAuth();
    const [animationEnd, setAnimationEnd] = useState(false);
    const [flyAnimEnd, setFlyAnimEnd] = useState(false);
    const [items, setItems] = React.useState<ItemData[]>([]);
    const [filteredItems, setFilteredItems] = React.useState<ItemData[]>([]);
    const [filterTag, setFilterTag] = React.useState("");
    const [adding, setAdding] = React.useState(false);
    const [editing, setEditing] = React.useState(false);
    const [selectedItem, setItem] = React.useState<ItemData | null>(null);

    const handleLogout = () => {
        document.location.href = "/";
    };

    return (
        <ItemContext.Provider
            value={{
                items,
                adding,
                editing,
                selectedItem,
                filteredItems,
                filterTag,
                setEditing,
                setAdding,
                setItem,
                setItems,
                setFilterTag,
                setFilteredItems,
            }}
        >
            <div
                className={clsx(
                    "w-screen h-screen bg-slate-900 overflow-hidden",
                    "flex flex-col justify-center items-center text-slate-100 font-virgil",
                    { "pt-32": authenticated }
                )}
            >
                <HeaderBox onAnimationEnd={() => setFlyAnimEnd(true)} />
                <SearchBox
                    onLogout={handleLogout}
                    show={flyAnimEnd}
                    onAnimationEnd={() => setAnimationEnd(true)}
                />
                {animationEnd && authenticated && <Home />}
            </div>
        </ItemContext.Provider>
    );
}

export default App;

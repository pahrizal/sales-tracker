import React from "react";
import { iItemContext, ItemData } from "./definition";

const itemContext = React.createContext<iItemContext>({
    adding: false,
    editing: false,
    selectedItem: null,
    items: [],
    filteredItems: [],
    filterTag: "",
    setAdding: (state: boolean) => {},
    setEditing: (state: boolean) => {},
    setItem: (data: ItemData | null) => {},
    setFilteredItems: (data: ItemData[]) => {},
    setFilterTag: (tag: string) => {},
    setItems: (data: ItemData[]) => {},
});

export default itemContext;

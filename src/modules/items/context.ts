import React from "react";
import { iItemContext, ItemData } from "./definition";

const itemContext = React.createContext<iItemContext>({
    adding: false,
    editing: false,
    item: null,
    setAdding: (state: boolean) => {},
    setEditing: (state: boolean) => {},
    setItem: (data: ItemData | null) => {},
});

export default itemContext;

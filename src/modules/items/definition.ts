export interface ItemData {
    id?: string;
    category: string;
    name: string;
    price: {
        sell: number;
        buy: number;
    };
    stock: {
        current: number;
        min: number;
    };
    description: string;
    image: string;
}

export enum ItemEvent {
    change = "change",
    delete = "delete",
}
export interface iItemContext {
    adding: boolean;
    editing: boolean;
    selectedItem: ItemData | null;
    items: ItemData[];
    filteredItems: ItemData[];
    filterTag: string;
    setAdding: (adding: boolean) => void;
    setEditing: (adding: boolean) => void;
    setItem: (data: ItemData | null) => void;
    setFilteredItems: (data: ItemData[]) => void;
    setFilterTag: (tag: string) => void;
    setItems: (data: ItemData[]) => void;
}

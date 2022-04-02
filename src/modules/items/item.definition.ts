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
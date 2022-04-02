import { DatabaseReference, DataSnapshot, onValue, push, ref } from "firebase/database";
import db from "../firebase";
import { ItemData, ItemEvent } from "./item.definition";

export default class ItemService {
    private ownerId: string;
    private dataPath: string;
    constructor(ownerId?: string) {
        this.ownerId = ownerId || "";
        this.dataPath = `${this.ownerId}/items`;
    }
    setOwner(ownerId: string) {
        this.ownerId = ownerId;
        this.dataPath = `${this.ownerId}/items`;
    }
    create(data: ItemData, onSuccess?: (value: DatabaseReference) => void, onError?: (error: Error) => void) {
        const dataRef = ref(db, this.dataPath);
        push(dataRef, data).then(onSuccess).catch(onError);
    }
    on(event: ItemEvent, onData: (data: DataSnapshot) => void, onError?: (error: Error) => void) {
        const dataRef = ref(db, this.dataPath);
        switch (event) {
            case ItemEvent.change:
                onValue(dataRef, onData, onError);
                break;
        }
    }
}

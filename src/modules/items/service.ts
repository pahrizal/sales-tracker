import {
    DatabaseReference,
    DataSnapshot,
    onValue,
    push,
    ref,
    remove,
    update,
} from "firebase/database";
import db from "../firebase";
import { ItemData, ItemEvent } from "./definition";

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
    create(
        data: ItemData,
        onSuccess?: (value: DatabaseReference) => void,
        onError?: (error: Error) => void
    ) {
        const dataRef = ref(db, this.dataPath);
        push(dataRef, data).then(onSuccess).catch(onError);
    }
    update(
        data: ItemData,
        onSuccess?: () => void,
        onError?: (error: Error) => void
    ) {
        const path = this.dataPath + "/" + data.id;
        if (!data.id) return;
        const dataRef = ref(db, path);
        update(dataRef, data).then(onSuccess).catch(onError);
    }
    remove(
        id: string,
        onSuccess?: () => void,
        onError?: (error: Error) => void
    ) {
        const dataRef = ref(db, this.dataPath + "/" + id);
        remove(dataRef).then(onSuccess).catch(onError);
    }
    on(
        event: ItemEvent,
        onData: (data: DataSnapshot) => void,
        onError?: (error: Error) => void
    ) {
        const dataRef = ref(db, this.dataPath);
        switch (event) {
            case ItemEvent.change:
                onValue(dataRef, onData, onError);
                break;
        }
    }
}

import { system, world, Container } from "@minecraft/server";
import { SerializableKinds } from "./con-database";
import { DynamicTable, Serializer } from "./con-database";
import { APISerializableKinds, registryAPISerializers } from "./con-database";


registryAPISerializers();
class ContainerMetadata{
    /**@param {Container} container  */
    static FromContainer(container){
        const meta = new ContainerMetadata();
        for (let i = 0; i < container.size; i++) {
            const item = container.getItem(i);
            if(item){
                meta.items.push(item);
                meta.slots.push(i);
            }
        }
        return meta;
    }
    static SaveToContainer(container, meta){
        for (const slot of meta.slots) {
            container.setItem(slot, meta.items.shift());
        }
    }
    constructor(){
        this.items = [];
        this.slots = [];
    }
}
Serializer.setSerializableClass(
    ContainerMetadata,
    "container-metedata-serialization-id", //do not change this id its unique ti your serializer
    function* ({items, slots}){
        const objectSerializer = Serializer.getSerializer(SerializableKinds.Object); 
        yield * objectSerializer(slots); //saving manifest info
        const itemSerialzer = Serializer.getSerializer(APISerializableKinds.ItemStack);
        for (const item of items) {
            throw new Error("Throw test");
            yield * itemSerialzer(item);
        }
    },
    function(n){
        const slots = Serializer.getDeserializer(SerializableKinds.Object)(n); //loading info
        const itemDeserializer = Serializer.getDeserializer(APISerializableKinds.ItemStack);
        const obj = new ContainerMetadata();
        obj.slots = slots;
        for (const s of slots) {
            obj.items.push(itemDeserializer(n));
        }
        return obj;
    }
);


world.clearDynamicProperties();
const table = DynamicTable.OpenCreate("Testing so far");
let saved = false;
world.afterEvents.chatSend.subscribe(({sender, message})=>{
    if(message === "m"){
    }else{
        if(!saved){
            table.set("inv", ContainerMetadata.FromContainer(sender.getComponent("inventory").container));
        }else{
            ContainerMetadata.SaveToContainer(sender.getComponent("inventory").container, table.get("inv"));
        }
        saved = !saved;
    }
});
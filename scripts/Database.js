import { NBT } from "./NBT";

export function get(sender){
    console.warn(JSON.stringify(NBT.decode(sender.getTags()[0])));
}
export function set(sender,obj){
    sender.addTag(NBT.code(obj));
}
import { EntityEquipmentInventoryComponent } from "@minecraft/server";

const ItemsToInclude = [
    "minecraft:sword",
];

function CheckEquipment(player){
    const equipment = player.getComponent(EntityEquipmentInventoryComponent.componentId);

}
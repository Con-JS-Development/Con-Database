import { system, world } from "@minecraft/server";
import { JsonDatabase, NBTDatabase } from "./utils";

const database = new NBTDatabase("Josh", "EndTickSave");

database.clear();
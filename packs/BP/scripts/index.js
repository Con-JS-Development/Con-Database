import { DatabaseSavingModes, NBTDatabase, JsonDatabase } from "database";


const a = new NBTDatabase("sus2",DatabaseSavingModes.OneTimeSave,50).load();
const b = new JsonDatabase("sus2");
console.warn(a === b);
a.set("sussy",{jerremy:(a.get("sussy")?.jerremy??0) + 1});

console.warn("Current sussy count is " + a.get("sussy").jerremy);
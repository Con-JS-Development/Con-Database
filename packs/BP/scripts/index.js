import { DatabaseSavingModes, NBTDatabase } from "db";


const a = new NBTDatabase("sus2",DatabaseSavingModes.OneTimeSave,50).load();
a.set("sussy",{jerremy:(a.get("sussy")?.jerremy??0) + 1});

console.warn("Current sussy count is " + a.get("sussy").jerremy);
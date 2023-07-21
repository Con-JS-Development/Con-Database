import {ScoreboardObjective,Entity,ScoreboardIdentity} from "@minecraft/server";
export * from "./utils/nbt-serializer";
class ScoreboardDatabaseManager<data> extends Map<string,data>{
    readonly maxLength: number;
    readonly objective: ScoreboardObjectvie
    readonly id: string;
    protected _scoreboard_: ScoreboardObjective
    protected _source_: Map<string,string|ScoreboardIdentity|Entity>;
    protected readonly _parser_: {stringify:(data: any)=>string,parse:(data: string)=>any}
    protected constructor(objective: string | ScoreboardObjective, savingMode?: typeof DatabaseSavingModes)
    protected constructor(objective: string | ScoreboardObjective, savingMode?: (typeof DatabaseSavingModes)["TickInterval"], interval?: 0)
    set(key: string, value: any): this
    delete(key: string): boolean
}
export class JsonDatabase<data> extends ScoreboardDatabaseManager<data>{
    constructor(objective: string | ScoreboardObjective, savingMode?: keyof typeof DatabaseSavingModes)
    constructor(objective: string | ScoreboardObjective, savingMode?: (typeof DatabaseSavingModes)["TickInterval"], interval?: 0)
}
export class NBTDatabase<data> extends ScoreboardDatabaseManager<data>{
    constructor(objective: string | ScoreboardObjective, savingMode?: keyof typeof DatabaseSavingModes)
    constructor(objective: string | ScoreboardObjective, savingMode: (typeof DatabaseSavingModes)["TickInterval"], interval?: 0)
}
export const DatabaseSavingModes: {
    OneTimeSave:"OneTimeSave",
    EndTickSave:"EndTickSave",
    TickInterval:"TickInterval"
}
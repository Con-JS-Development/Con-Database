import {World, Entity} from "@minecraft/server";
declare class DynamicDatabase extends Map{
    protected constructor();
    set(key: string, value: any)
    delete(key: string): boolean
    clear(): void
    isValid(): boolean
    dispose(): void
    readonly isDisposed: boolean
}
//@ts-ignore
export class JsonDatabase extends DynamicDatabase{ constructor(source: World | Entity, id: string); }
//@ts-ignore
export class WorldDatabase extends JsonDatabase { constructor(id: string) }
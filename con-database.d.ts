import { World, Entity } from "@minecraft/server";

class DynamicSource {
    readonly source: World | Entity;
    constructor(source: World | Entity)
    getIds(): string[]
    get(key: string): any
    set(key: string, value: any): void
    delete(key): boolean | undefined
    isValid():boolean
}
class DynamicDatabase extends Map{
    constructor(source: DynamicSource, id: string, kind: string, parser: {stringify(object: any): string, parse(raw: string): any})
    isValid(): boolean
    dispose(): void
    readonly isDisposed: boolean
}
class JsonDatabase extends DynamicDatabase{ constructor(id: string, source?: World | Entity ); }
interface DynamicProxyConstructor{
    new (id: string, source?: World | Entity): {[k: string]: any | undefined}
}
const DynamicProxy: DynamicProxyConstructor;
enum SerializableKinds {
    Boolean="c0211201-0001-4002-8001-4f90af596647",
    Number="c0211201-0001-4002-8002-4f90af596647",
    String="c0211201-0001-4002-8003-4f90af596647",
    Object="c0211201-0001-4002-8004-4f90af596647",
    DynamicTable="c0211201-0001-4002-8101-4f90af596647"
}
interface Deserializer<T> extends Generator<T,void,unknown>{
    continue(): T,
    readonly source: DynamicSource;
    readonly length: number;
    readonly rootKey: string;
    readonly kind: string;
}

namespace Serializer {
    function isSerializable(object: any): boolean
    function getSerializerKind(object: any): string | undefined
    function isRegistredKind(kind: string): boolean
    function setSerializableKind(object: object, kind: string): boolean
    function registrySerializer<K extends string>(kind: K, serializer: (object: any)=>Generator<string>, deserializer: (source: Deserializer<string>)=>void): K;
    function getSerializer(kind: string): null | ((object: any)=>Generator<string>)
    function getDeserializer(kind: string): ((source: Deserializer<string>)=>void) | null
    function setSerializableClass<T>(construct: new (...any: any[])=>T, kind: string, serializer: (object: T)=>Generator<string>, deserializer: (source: Deserializer<string>)=>T): void
    function getKindFromClass(construct: new (...any: any[])=>any): string | null;
    function getSerializerKinds(): IterableIterator<string>
    function getSerializers(kind: string): {serializer: (object: any)=>Generator<string>, deserializer: (source: Deserializer<string>)=>void}
    function overrideSerializers<K extends string>(kind: K, serializer: (object: any)=>Generator<string>, deserializer: (source: Deserializer<string>)=>void): K;
}

class DynamicTable extends Map<string, any>{
    static readonly KIND: string;
    static OpenCreate(id: string): DynamicTable;
    static ClearAll(): void;
    static getTableIds(): IterableIterator<string>;
    static DeleteTable(id: string): boolean;

    readonly tableId: string;
    private constructor();
    isValid(): boolean;
}
class DataCoruptionError extends ReferenceError{
    constructor(source: DynamicSource, rootKey: string, message: string);
    remove(): void
}

export {JsonDatabase, DynamicProxy, DynamicTable, Serializer, DataCoruptionError, SerializableKinds};
/**
 * resitry basic serializations for API classes, based on compatibility but doesn't breaks in older or newer versions, each feature is available based on your module version used
 *  - BlockType class
 *  - EntityType class
 *  - ItemType class
 *  - BlockPermutation class --> requires BlockType class feature
 *  - ItemStack class
 *      - typeId
 *      - amount
 *      - nameTag
 *      - keepOnDeath
 *      - lockMode
 *      - lore
 *      - canDestroy
 *      - canPlaceOn
 *      - dynamic Properties
 *      - enchantable component
 *      - durability component
 *  - Vector class
 * 
 * Example of API serializers
 * ```js
 * const dt = DynamicTable.OpenCreate("test");
 * dt.set("item", new ItemStack("iron_sword"));
 * const canPlaceOn = dt.get("item").getCanPlaceOn();
 * ```
 */
export const registryAPISerializers: ()=>void
export enum APISerializableKinds {
    BlockType = "c0211201-0001-4002-8201-4f90af596647",
    EntityType = "c0211201-0001-4002-8202-4f90af596647",
    ItemType = "c0211201-0001-4002-8203-4f90af596647",
    BlockPermutation = "c0211201-0001-4002-8204-4f90af596647",
    ItemStack = "c0211201-0001-4002-8205-4f90af596647",
    Vector = "c0211201-0001-4002-8206-4f90af596647",
}
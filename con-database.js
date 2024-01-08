import { world, World, Entity, system } from "@minecraft/server";
import * as mc from "@minecraft/server";
const mc_world = world;
const {setDynamicProperty: wSDP, getDynamicProperty: wGDP, getDynamicPropertyIds: wGDPI} = World.prototype;
let {isValid: isValidEntity, setDynamicProperty: eSDP, getDynamicProperty: eGDP, getDynamicPropertyIds: eGDPI} = Entity.prototype;
const DYNAMIC_DB_PREFIX = "\u1221\u2112";
const ROOT_CONTENT_TABLE_UUID = "c0211201-0001-4001-8001-4f90af596647";
const STRING_LIMIT = 32e3;
const TABLE_STRING_LENGTH = 31e3;
const GENERATOR_DESERIALIZER_SYMBOL = Symbol("DESERIALIZER");
const eP = {
    gDP: eGDP,
    sDP: eSDP,
    gDPI: eGDPI
};
const wP = {
    gDP: wGDP,
    sDP: wSDP,
    gDPI: wGDPI
};
class DynamicSource {
    /**@readonly @type {World | Entity} */
    source;
    /**@param {World | Entity} source  */
    constructor(source){
        this.source = source;
        if(SOURCE_INSTANCES.has(source)) return SOURCE_INSTANCES.get(source);
        if(source === mc_world) Object.assign(this, wP); else if (isValidEntity.call(source)) Object.assign(this, eP);
        else throw new ReferenceError("Invald source type: " + source);
        SOURCE_INSTANCES.set(source, this);
    }
    /**@returns {string[]} */
    getIds(){return this.gDPI.call(this.source);}
    /**@param {string} key  @returns {number | boolean | string | import("@minecraft/server").Vector3}*/
    get(key){return this.gDP.call(this.source,key);}
    /**@param {string} key */
    set(key,value){ this.sDP.call(this.source, key, value);}
    /**@param {string} key @returns {boolean}  */
    delete(key){this.sDP.call(this.source, key, undefined); return true;}
    /**@returns {boolean}  */
    isValid(){ return this.source === world || isValidEntity.call(this.source); }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////   DYNAMIC DATABASE
///////////////////////////////////////////////////////////////////////////////////////////////////////
const SOURCE_INSTANCES = new WeakMap();
const DDB_SUBINSTANCES = new WeakMap();
class DynamicDatabase extends Map{
    /**@readonly @private @type {DynamicSource} */
    _source;
    /**@readonly @private @type {string} */
    _prefix;
    /**@readonly @private @type {string} */
    _prefixLength;
    /**@readonly @private */
    _STRINGIFY;
    /**@readonly @private*/
    _PARSE;
    /** @private*/
    _notDisposed;
    /**@param {World | Entity} source @param {string} id @param {string} kind   */
    constructor(source, id, kind, parser){
        super();
        this._source = new DynamicSource(source);
        const PRE = `${kind}${DYNAMIC_DB_PREFIX}${id}${DYNAMIC_DB_PREFIX}`, LENGTH = PRE.length, SOURCE = this._source, PARSE = parser.parse;
        const MAP_INSTANCES = DDB_SUBINSTANCES.get(SOURCE)??new Map;
        if(MAP_INSTANCES.has(PRE)) return MAP_INSTANCES.get(PRE);
        MAP_INSTANCES.set(PRE, this); DDB_SUBINSTANCES.set(SOURCE, MAP_INSTANCES);
        if(!SOURCE.isValid()) throw new ReferenceError("Source is no longer valid: " + SOURCE.source);
        this._prefix = PRE;
        this._prefixLength = LENGTH;
        this._STRINGIFY = parser.stringify;
        //this._PARSE = PARSE;
        this._notDisposed = true;
        for (const K of SOURCE.getIds()) if(K.startsWith(PRE)) {
            const key = K.substring(LENGTH);
            const value = SOURCE.get(K);
            if(typeof value === "string") super.set(key, PARSE(value));
        }
    }
    /**@param {string} key @param {any} value */
    set(key, value){
        if(!this.isValid()) throw new ReferenceError("This database instance is no longer valid");
        if(key.length + this._prefixLength > STRING_LIMIT) throw new TypeError("Key is too long: " + key.length);
        if(value === undefined) { 
            this.delete(key);
            return this;
        }
        const data = this._STRINGIFY(value);
        if(data.length > STRING_LIMIT) throw new TypeError("Size of data in string is too long: " + data.length);
        this._source.set(this._prefix + key, data);
        return super.set(key,value);
    }
    /**@param {string} key  */
    delete(key){
        if(!this.isValid()) throw new ReferenceError("This database instance is no longer valid");
        if(!this.has(key)) return false;
        this._source.delete(this._prefix + key);
        return super.delete(key);
    }
    clear(){
        if(!this.isValid()) throw new ReferenceError("This database instance is no longer valid");
        const P = this._prefix;
        const s = this._source;
        for(const key of this.keys()) s.delete(P + key);
        return super.clear();
    }
    /**@returns {boolean} */
    isValid(){return this._source.isValid() && this._notDisposed;}
    dispose(){
        this._notDisposed = false;
        DDB_SUBINSTANCES.get(this._source)?.delete?.(this._prefix);
        super.clear();
    }
    /**@readonly @type {boolean} */
    get isDisposed(){return !this._notDisposed;}
}
class DynamicWrapper {
    
    /**@readonly @private @type {Entity | World | ItemStack} */
    _source;
    /**@readonly @private @type {string} */
    _prefix;
    /**@readonly @private @type {string} */
    _prefixLength;
    /**@readonly @private */
    _STRINGIFY;
    /**@readonly @private*/
    _PARSE;
    /**@param {World | Entity} source @param {string} id @param {string} kind   */
    constructor(source, id, kind, parser){
        this._source = source;
        const PRE = `${kind}${DYNAMIC_DB_PREFIX}${id}${DYNAMIC_DB_PREFIX}`, LENGTH = PRE.length;
        this._prefix = PRE;
        this._prefixLength = LENGTH;
        this._STRINGIFY = parser.stringify;
        this._PARSE = parser.parse;
    }
    clear(){ for( const k of this.__getKeys()) this._source.set(k, undefined); };
    /**
     * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
     */
    delete(key) {
        const has = this.has(key);
        this._source.set(this._prefix + key, undefined);
        return has;
    };
    /**
     * Executes a provided function once per each key/value pair in the Map, in insertion order.
     * @param {(value: any, key: string, map: DynamicWrapper) => void} callbackfn 
     * @param {any} thisArg 
     */
    forEach(callbackfn, thisArg = null){
        for (const k of this.keys()) {
            try {
                callbackfn.call(thisArg??null, k, this.get(k), this);
            } catch (error) {
                
            }
        }
    }
    /**
     * Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.
     * @returns Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.
     */
    get(key){ const a = this._source.get(this._prefix + key); typeof a === "string"?this._PARSE(a):a; };
    /**
     * @returns boolean indicating whether an element with the specified key exists or not.
     */
    has(key){ return this._source.get(this._prefix + key)!==undefined; }
    /**
     * Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
     */
    set(key, value){
        this._source.set(this._prefix + key, this._STRINGIFY(value));
        return this;
    };
    /**
     * @returns the number of elements in the Map.
     */
    get size(){return [...this.__getKeys()].length;};
    /** Returns an iterable of entries in the map. */
    [Symbol.iterator](){return this.entries();}
    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     */
    *entries(){for( const k of this.__getKeys()) yield [k.substring(this._prefixLength),this._PARSE(this._source.get(k))]};
    /**
     * Returns an iterable of keys in the map
     */
    *keys(){for( const k of this.__getKeys()) yield k.substring(this._prefixLength);};
    /**
     * Returns an iterable of values in the map
     */
    *values(){for( const k of this.__getKeys()) yield this._PARSE(this._source.get(k));}
    *__getKeys(){ for (const K of this._source.getIds()) if(K.startsWith(this._prefix)) yield K; }
}
class JsonDatabase extends DynamicDatabase{ constructor(id, source = world){ super(source, id, "JSON", JSON); } }
class JSONDynamicWrapper extends DynamicWrapper{ constructor(id, source = world){ super(source, id, "JSON", JSON); } }

class DynamicProxy extends JsonDatabase{
    constructor(id, source = world){
        super(id, source);
        return new Proxy(this,{
            defineProperty(t,p,att){
                if(att.value && typeof p === "string"){
                    t.set(p,att.value);
                    return true;
                }
                return false;
            },
            deleteProperty(t,p){
                if(typeof p === "string") return t.delete(p);
                return false;
            },
            set(t, p, newValue){
                if(typeof p === "string") {
                    t.set(p, newValue);
                    return true;
                }
                return false;
            },
            get(t, p){
                if(typeof p === "string") {
                    return t.get(p)??Object.prototype[p];
                }
                return false;
            },
            getPrototypeOf(t){return Object.prototype;},
            isExtensible(t){return true;},
            setPrototypeOf(t){return false;},
            has(t,k){return t.has(k);},
            preventExtensions(t){return false;},
            ownKeys(t){ return [...t.keys()]; },
            getOwnPropertyDescriptor(t,k){
                if(t.has(k)){
                    return {value:t.get(k), enumerable: true, configurable: true, writable: true};
                }
            }
        });
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////   COMPLEX DATABASE
///////////////////////////////////////////////////////////////////////////////////////////////////////
const PARSER_SYMBOL = Symbol("SERIALIZEABLE");
const SERIALIZERS = new Map();
const DESERIALIZER_INFO = new WeakMap();
const ROOT_KEY = "root::" + ROOT_CONTENT_TABLE_UUID;
const TABLE_SOURCES = new WeakMap();
const TABLE_ID = new WeakMap();
const ID_TABLE = new WeakMap();
const TABLE_VALIDS = new WeakSet();
let isNativeCall = false;
let RootTable;
function getRootTable(){
    if(RootTable) return RootTable;
    return RootTable = world.getDynamicProperty(ROOT_KEY)?DATABASE_MANAGER.deserialize(ROOT_KEY, new DynamicSource(world)):(()=>{
        const source = new DynamicSource(world);
        isNativeCall = true;
        const value = new DynamicTable();
        isNativeCall = false;
        TABLE_SOURCES.set(value, source);
        TABLE_ID.set(value, ROOT_KEY);
        SetTable(source, ROOT_KEY, value);
        TABLE_VALIDS.add(value);
        DATABASE_MANAGER.serialize(ROOT_KEY, source, value);
        return value;
    })();
}

const SerializableKinds = {
    Boolean:"c0211201-0001-4002-8001-4f90af596647",
    Number:"c0211201-0001-4002-8002-4f90af596647",
    String:"c0211201-0001-4002-8003-4f90af596647",
    Object:"c0211201-0001-4002-8004-4f90af596647",
    DynamicTable: "c0211201-0001-4002-8101-4f90af596647"
};
SerializableKinds[SerializableKinds.Boolean] = "Boolean";
SerializableKinds[SerializableKinds.Number] = "Number";
SerializableKinds[SerializableKinds.String] = "String";
SerializableKinds[SerializableKinds.Object] = "Object";
SerializableKinds[SerializableKinds.DynamicTable] = "DynamicTable";
const Serializer = {
    isSerializable(object){ return object[PARSER_SYMBOL] != undefined; },
    getSerializerKind(object){ return object[PARSER_SYMBOL];},
    isRegistredKind(kind){return SERIALIZERS.has(kind);},
    setSerializableKind(object, kind){
        if(SERIALIZERS.has(kind)){ object[PARSER_SYMBOL] = kind; return true; }
        return false;
    },
    registrySerializer(kind, serializer, deserializer){
        if(SERIALIZERS.has(kind)) throw new ReferenceError("Duplicate serialization kind: " + kind);
        if(typeof kind != "string") throw new TypeError("Kind must be type of string.");
        if(typeof serializer != "function" || typeof deserializer != "function") throw new TypeError("serializer or deserializer is not a function");
        SERIALIZERS.set(kind,{serializer,deserializer});
        return kind;
    },
    getSerializer(kind){
        return SERIALIZERS.get(kind)?.serializer??null;
    },
    getDeserializer(kind){
        return SERIALIZERS.get(kind)?.deserializer??null;
    },
    getSerializers(kind){
        const data = SERIALIZERS.get(kind);
        if(!data) return null;
        return {...data};
    },
    setSerializableClass(construct, kind, serializer, deserializer){
        if(typeof serializer !== "function" || typeof deserializer !== "function") throw new TypeError("Serializer or deserializer is not a function");
        Serializer.registrySerializer(kind, function(obj){
            if(obj == null) throw new TypeError("Null or Undefined is not possible to serialize.");
            return serializer(obj);
        }, function(obj){
            if(obj[GENERATOR_DESERIALIZER_SYMBOL] !== true) throw new TypeError("Null or Undefined is not possible to serialize.");
            return deserializer(obj);
        });
        Serializer.setSerializableKind(construct.prototype,kind);
    },
    getKindFromClass(construct){
        return construct?.prototype?.[PARSER_SYMBOL]??null;
    },
    getSerializerKinds(){return SERIALIZERS.keys();},
    overrideSerializers(kind, serializer, deserializer){
        if(typeof kind != "string") throw new TypeError("Kind must be type of string.");
        if(typeof serializer != "function" || typeof deserializer != "function") throw new TypeError("serializer or deserializer is not a function");
        SERIALIZERS.set(kind,{serializer,deserializer});
        return kind;
    }
}
const DATABASE_MANAGER = {
    getHeader(rootRef, source){
        const data = source.get(rootRef);
        if(typeof data != "string") return null;
        return JSONReadable(data);
    },
    serialize(rootRef, source, object){
        if(!Serializer.isRegistredKind(Serializer.getSerializerKind(object))) throw new TypeError("object is not serializeable.");
        const kind = Serializer.getSerializerKind(object)
        const serializer = Serializer.getSerializer(kind);
        if(!serializer) throw new ReferenceError("No serializer for " + kind);
        return this.serializationResolver(
            serializer(object, {kind,source,rootRef})
            ,rootRef,source, kind
        );
    },
    /**@param {Generator<object,any,string>} gen  */
    serializationResolver(gen, rootRef, source, kind){
        const oldHeader = this.getHeader(rootRef, source);
        const prefix = rootRef + "::";
        let oldLength = 0, newLength = 0;
        if(oldHeader){
            const [data] = oldHeader;
            oldLength = parseInt(data["length"],36);
        }
        try {
            let genNext = gen.next();
            if(!genNext.done) {
                const headerData = genNext.value + "";
                if(headerData.length > TABLE_STRING_LENGTH) gen.throw(new RangeError("Yielded stirng is too big: " + headerData.length));
                genNext = gen.next();
                while (!genNext.done) {
                    const key = prefix + newLength;
                    try {
                        source.set(key, genNext.value + "");
                        newLength++;
                    } catch (error) {
                        gen.throw(error);
                    }
                    genNext = gen.next();
                }
                source.set(rootRef, JSONWritable({length:newLength.toString(36),kind},headerData));
            }
            return newLength;
        }
        catch(er){
            Object.setPrototypeOf(er, DataCoruptionError.prototype);
            er.source = source;
            er.rootKey = rootRef;
            throw er;
        }
        finally {
            for (let i = newLength; i < oldLength; i++) source.delete(prefix + i);
        }
    },
    deserialize(rootRef, source, header = undefined){
        try {
            const oldHeader = header??this.getHeader(rootRef, source);
            if(!oldHeader) return null;
            const prefix = rootRef + "::";
            const [{length:le,kind}, data] = oldHeader;
            let length = parseInt(le,36);
            if(!Serializer.isRegistredKind(kind)) throw new ReferenceError("Unknown parser kind: " + kind);
            const deserializeResolver = Serializer.getDeserializer(kind);
            if(!deserializeResolver) throw new ReferenceError("No deserializer for: " + kind);
            const deserializer = this.deserializer(source, rootRef, prefix, length, data);
            DESERIALIZER_INFO.set(deserializer, {
                source,
                rootRef,
                kind,
                deserializeResolver,
                oldHeader,
                length,
            });
            return deserializeResolver(deserializer);
        } catch (error) {
            error.rootKey = rootRef;
            error.source = source;
            throw Object.setPrototypeOf(error, DataCoruptionError);
        }
    },
    *deserializer(source, root, prefix, length, initial){
        yield  initial;
        let i = 0;
        while(i < length){
            const data = source.get(prefix + i);
            if(!data) throw new DataCoruptionError(source, root, "No continual data at index of " + i);
            yield data;
            i++;
        }
    },
    removeTree(rootRef, source){ 
        const oldHeader = this.getHeader(rootRef, source);
        if(!oldHeader) return false;
        const prefix = rootRef + "::";
        const [{length:le}] = oldHeader;
        let length = parseInt(le,36);
        if(!isFinite(length)) return false;
        for (let i = 0; i < length; i++) source.delete(prefix + i);
        source.delete(rootRef);
        return true;
    }
}

Object.defineProperties(DATABASE_MANAGER.deserializer.prototype,Object.getOwnPropertyDescriptors({
    [GENERATOR_DESERIALIZER_SYMBOL]: true,
    return(){
        return {done:true};
    },
    continue(){
        return this.next(...arguments).value;
    },
    get source(){
        if(!DESERIALIZER_INFO.has(this)) throw new ReferenceError("Object bound to prototype does not exist.");
        return DESERIALIZER_INFO.get(this).source;
    },
    get rootKey(){
        if(!DESERIALIZER_INFO.has(this)) throw new ReferenceError("Object bound to prototype does not exist.");
        return DESERIALIZER_INFO.get(this).rootRef;
    },
    get length(){
        if(!DESERIALIZER_INFO.has(this)) throw new ReferenceError("Object bound to prototype does not exist.");
        return DESERIALIZER_INFO.get(this).length;
    },
    get kind(){
        if(!DESERIALIZER_INFO.has(this)) throw new ReferenceError("Object bound to prototype does not exist.");
        return DESERIALIZER_INFO.get(this).kind;
    }
}));
class DynamicTable extends Map{
    /**@readonly */
    static get KIND(){return "c0211201-0001-4002-8101-4f90af596647";}
    /**@readonly @type {string} */
    get tableId(){return TABLE_ID.get(this);}
    constructor(){
        if(!isNativeCall) throw new ReferenceError("No constructor for " + DynamicTable.name);
        super();
    }
    get(key){
        if(!this.isValid()) throw new ReferenceError("Object bound to prototype doesn't not exist at [DynamicTable::get()].");
        if(!this.has(key)) return;
        const source = TABLE_SOURCES.get(this);
        const dataId = super.get(key);
        return DATABASE_MANAGER.deserialize(dataId, source);
    }
    set(key, value){
        if(!this.isValid()) throw new ReferenceError("Object bound to prototype doesn't not exist at [DynamicTable::get()].");
        if(value == null) throw new ReferenceError("You can not assign property to null or undefined");
        if(!Serializer.isRegistredKind(Serializer.getSerializerKind(value))) throw new TypeError("value is not serializeable.");
        if(value instanceof  DynamicTable) throw new TypeError("You can't set value as DynamicTable please use AddTable");
        const has = this.has(key);

        const source = TABLE_SOURCES.get(this);

        let newKey;
        if(has){
            newKey = super.get(key);
            const header = DATABASE_MANAGER.getHeader(newKey, source);
            if(header?.[0]?.kind === DynamicTable.KIND) {
                const a = DATABASE_MANAGER.deserialize(newKey, source, header);
                a.clear();
                TABLE_VALIDS.delete(a);
            }
        }else{
            newKey = "k:" + v4uuid()
            super.set(key, newKey);
            SaveState(this);
        }
        DATABASE_MANAGER.serialize(newKey, source, value);
        return this;
    }
    clear(){
        if(!this.isValid()) throw new ReferenceError("Object bound to prototype doesn't not exist at [DynamicTable::clear()].");
        const source = TABLE_SOURCES.get(this);
        const KIND = DynamicTable.KIND;
        for (const k of super.keys()) {
            const dataId = super.get(k);
            const header = DATABASE_MANAGER.getHeader(dataId,source);
            if(header?.[0]?.kind === KIND) {
                const a = DATABASE_MANAGER.deserialize(dataId, source, header);
                a.clear();
                TABLE_VALIDS.delete(a);
            }
            DATABASE_MANAGER.removeTree(dataId, source);
        }
        SaveState(this);
        super.clear();
    }
    delete(key){ 
        if(!this.isValid()) throw new ReferenceError("Object bound to prototype doesn't not exist at [DynamicTable::delete()].");
        const source = TABLE_SOURCES.get(this);
        if(!this.has(key)) return false;
        const dataId = super.get(key);
        const header = DATABASE_MANAGER.getHeader(dataId,source);
        if(header?.[0]?.kind === DynamicTable.KIND) {
            const a = DATABASE_MANAGER.deserialize(dataId, source, header);
            a.clear();
            TABLE_VALIDS.delete(a);
        }
        DATABASE_MANAGER.removeTree(dataId, source);
        SaveState(this);
        return super.delete();
    }
    *entries(){ 
        if(!this.isValid()) throw new ReferenceError("Object bound to prototype doesn't not exist at [DynamicTable::entries()].");
        for (const [k,v] of super.entries()) yield [k, this.get(k)];
    }
    [Symbol.iterator](){return this.entries();}
    *values(){
        if(!this.isValid()) throw new ReferenceError("Object bound to prototype doesn't not exist at [DynamicTable::values()].");
        for (const k of super.keys()) yield this.get(k);
    }
    isValid(){
        return !!(TABLE_VALIDS.has(this) && TABLE_SOURCES.get(this)?.isValid?.());
    }
    /**@returns {DynamicTable} */
    static OpenCreate(id){
        let fromTable = getRootTable();
        let a = fromTable.get(id);
        if(a === undefined) {
            if(!fromTable.isValid()) throw new ReferenceError("Object bound to prototype doesn't not exist at [DynamicTable::get()].");
            if(Map.prototype.has.call(fromTable,id)) throw new ReferenceError("Value of this key already exists");
            const source = TABLE_SOURCES.get(fromTable);
            let newKey = "t" + v4uuid();
            isNativeCall = true;
            const value = new DynamicTable();
            isNativeCall = false;
            Map.prototype.set.call(fromTable, id, newKey);
            SaveState(fromTable);
            DATABASE_MANAGER.serialize(newKey, source, value);
            TABLE_SOURCES.set(value, source);
            TABLE_ID.set(value, newKey);
            SetTable(source, newKey, value);
            TABLE_VALIDS.add(value);
            a = value;
        }
        else if(!(a instanceof DynamicTable)) throw new TypeError(`Value saved in ${id} is not a dynamic table.`);
        return a;
    }
    static ClearAll(){ getRootTable().clear(); }
    static getTableIds(){ return getRootTable().keys(); }
    static DeleteTable(key){ return getRootTable().delete(key);}
}
function SaveState(table){
    if(table._task === undefined) {
        table._task = system.run(()=>{
            table._task = undefined;
            if(table.isValid()){
                DATABASE_MANAGER.serialize(table.tableId, TABLE_SOURCES.get(table), table);
            }
        });
    }
}
function GetTable(source, rootRef){ return ID_TABLE.get(source)?.get(rootRef); }
function SetTable(source, rootRef, table){ 
    if(!ID_TABLE.has(source)) ID_TABLE.set(source,new Map());
    ID_TABLE.get(source).set(rootRef, table);
}
class DataCoruptionError extends ReferenceError{
    constructor(source, rootKey, message){
        super(message);
        this.rootKey = rootKey;
        this.source = source;
    }
    remove(){
        if(!this.source.isValid()) throw new ReferenceError("Source is no longer valid");
        DATABASE_MANAGER.removeTree(this.rootKey, this.source);
    }
}

Serializer.setSerializableClass(DynamicTable, DynamicTable.KIND, 
    function*(table){
        let obj = {}, i = 0;
        const get = Map.prototype.get, maxSize = 300;
        yield Math.ceil(table.size / maxSize);
        for(const key of table.keys()) {
            if(++i >= maxSize){
                yield JSON.stringify(obj);
                i = 0, obj = {};
            }
            obj[key] = get.call(table,key);
        }
        if(i) yield JSON.stringify(obj);
    },
    function(n){
        if(GetTable(n.source,n.rootKey)) return GetTable(n.source,n.rootKey);
        isNativeCall = true;
        const table = new DynamicTable();
        isNativeCall = false;
        TABLE_SOURCES.set(table, n.source);
        TABLE_ID.set(table, n.rootKey);
        SetTable(n.source, n.rootKey, table);
        TABLE_VALIDS.add(table);
        const set = Map.prototype.set;
        const length = Number(n.continue());
        for (let i = 0; i < length; i++) {
            const data = n.continue();
            if(!data) throw new DataCoruptionError(n.source,n.rootKey,"Data for this dynamic table are corupted.");
            const obj = JSON.parse(data);
            for(const k of Object.getOwnPropertyNames(obj)) set.call(table, k, obj[k]);
        }
        return table;
    }
);
Serializer.setSerializableClass(Boolean, SerializableKinds.Boolean, function*(n){yield n;}, function(n){for(const a of n) return a==="true";});
Serializer.setSerializableClass(Number, SerializableKinds.Number, function*(n){yield n;}, function(n){for(const a of n) return Number(a);});
Serializer.setSerializableClass(String, SerializableKinds.String, 
    function*(n){
        let length = n.length;
        let cursor = 0;
        let i = 0;
        yield Math.ceil(length / TABLE_STRING_LENGTH);
        while(length > 0){
            const s = n.substring(cursor,cursor + TABLE_STRING_LENGTH);
            const l = s.length;
            if(l <= 0) return;
            length -= l, cursor += l;
            yield s;
            i++;
        }
    }, 
    function(n){
        const count = Number(n.continue());
        const l = new Array(count);
        for (let i = 0; i < count; i++) {
            l[i] = n.continue();
        }
        return l.join("");
    }
);
Serializer.setSerializableClass(Object, SerializableKinds.Object,
    function(n){ return Serializer.getSerializer(SerializableKinds.String)(JSON.stringify(n)); },
    function(n){ return JSON.parse(Serializer.getDeserializer(SerializableKinds.String)(n)); }
);
function v4uuid(timestamp =  Date.now()){
    const {random,floor} = Math;
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) =>{
      let r = (timestamp + random() * 16) % 16 | 0;
      timestamp = floor(timestamp / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
function Readable(text){
    const size = text.charCodeAt(0);
    const info = text.substring(1,1+size);
    const data = text.substring(1+size);
    return [info, data, size];
}
function JSONReadable(text){
    const [info, data, size] = Readable(text);
    return [JSON.parse(info), data, size];
}
function Writable(json, text){
    return `${String.fromCharCode(json.length)}${json}${text}`;
}
function JSONWritable(json, text){ return Writable(JSON.stringify(json),text); };

export {JsonDatabase, DynamicProxy, DynamicTable, Serializer, DataCoruptionError, SerializableKinds};

export const APISerializableKinds = {
    BlockType: "c0211201-0001-4002-8201-4f90af596647",
    EntityType: "c0211201-0001-4002-8202-4f90af596647",
    ItemType: "c0211201-0001-4002-8203-4f90af596647",
    BlockPermutation: "c0211201-0001-4002-8204-4f90af596647",
    ItemStack: "c0211201-0001-4002-8205-4f90af596647",
    Vector: "c0211201-0001-4002-8206-4f90af596647",
    "c0211201-0001-4002-8201-4f90af596647": "BlockType",
    "c0211201-0001-4002-8202-4f90af596647": "EntityType",
    "c0211201-0001-4002-8203-4f90af596647": "ItemType",
    "c0211201-0001-4002-8204-4f90af596647": "BlockPermutation",
    "c0211201-0001-4002-8205-4f90af596647": "ItemStack",
    "c0211201-0001-4002-8206-4f90af596647": "Vector",
}
export const registryAPISerializers = ()=>{
    const {
        BlockType, BlockTypes, BlockPermutation,
        EntityType, EntityTypes,
        ItemType, ItemTypes, ItemStack, Vector
    } = mc;
    const ItemStackSupportLevel = {
        dynamicProperties: ItemStack.prototype.getDynamicProperty,
        canPlaceOn: ItemStack.prototype.getCanPlaceOn,
        canDestory: ItemStack.prototype.getCanDestroy,
        lore: ItemStack.prototype.getLore,
        lockMode: mc.ItemLockMode,
        keepOnDeath: "keepOnDeath" in ItemStack.prototype,
        components: ItemStack.prototype.getComponents,
        enchantable: mc.ItemEnchantableComponent,
        durability: mc.ItemDurabilityComponent,
    }
    for (const key in ItemStackSupportLevel) {
        if (Object.hasOwnProperty.call(ItemStackSupportLevel, key)) {
            const element = ItemStackSupportLevel[key];
        }
    }
    const ItemStackComponentManager = {
        serializers:{ },
        deserializers:{ }
    }
    const {
        serializers: ItemComponentSerializers,
        deserializers: ItemComponentDeserializers
    } = ItemStackComponentManager;
    if(ItemStackSupportLevel.durability) {
        ItemComponentSerializers[ItemStackSupportLevel.durability.componentId] = function(component){ return component.damage;};
        ItemComponentDeserializers[ItemStackSupportLevel.durability.componentId] = function(component,v){ component.damage = v;};
    }
    if(ItemStackSupportLevel.enchantable){
        ItemComponentSerializers[ItemStackSupportLevel.enchantable.componentId] = function(component){ return component.getEnchantments().map(e=>({t:e.type.id,l:e.level}));};
        ItemComponentDeserializers[ItemStackSupportLevel.enchantable.componentId] = function(component,v){ component.addEnchantments(v.map(e=>({type:e.t,level:e.l})));};
    }
    
    if(BlockTypes) Serializer.setSerializableClass(BlockType, APISerializableKinds.BlockType, function*(n){yield n.id;}, function(n){for(const a of n) return BlockTypes.get(a);});
    if(EntityTypes) Serializer.setSerializableClass(EntityType, APISerializableKinds.EntityType, function*(n){yield n.id;}, function(n){for(const a of n) return EntityTypes.get(a);});
    if(ItemTypes) Serializer.setSerializableClass(ItemType, APISerializableKinds.ItemType, function*(n){yield n.id;}, function(n){for(const a of n) return ItemTypes.get(a);});
    
    if("type" in BlockPermutation.prototype) Serializer.setSerializableClass(BlockPermutation, APISerializableKinds.BlockPermutation, 
        function*(n){
            yield n.type.id;
            yield JSON.stringify(n.getAllStates());
        }, 
        function(n){
            const [typeId, states] = n;
            return BlockPermutation.resolve(typeId, JSON.parse(states));
        }
    );
    Serializer.setSerializableClass(ItemStack, APISerializableKinds.ItemStack,
        function*(n){
            const components = ItemStackSupportLevel.components?[...n.getComponents()].filter(e=>e && (e.typeId in ItemComponentSerializers)):[];
            const canPlaceOn = ItemStackSupportLevel.canPlaceOn?n.getCanPlaceOn():[];
            const canDestroy = ItemStackSupportLevel.canDestory?n.getCanDestroy():[];
            const dynamicProperties = ItemStackSupportLevel.dynamicProperties?n.getDynamicPropertyIds():[];
            yield JSON.stringify([
                n.typeId, 
                n.amount, 
                ItemStackSupportLevel.keepOnDeath?n.keepOnDeath:false,
                ItemStackSupportLevel.lockMode?n.lockMode:"",
                typeof n.nameTag === "string",
                components.length,
                canPlaceOn.length,
                canDestroy.length,
                dynamicProperties.length
            ]);
            n.nameTag?yield n.nameTag:null;
            yield JSON.stringify(ItemStackSupportLevel.lore?n.getLore():[]);
            for (const com of components) yield JSON.stringify([com.typeId, ItemComponentSerializers[com.typeId](com)]);
            yield * canPlaceOn;
            yield * canDestroy;
            for(const k of dynamicProperties) {
                const data = JSON.stringify(n.getDynamicProperty(k));
                if((data.length + k.length) > TABLE_STRING_LENGTH) throw new TypeError(`Dynamic property '${k}' of this item is too large'${data.length}'`);
                yield Writable(k,data);
            }
        }, 
        function(n){
            const [
                typeId, amount, keepOnDeath, lockMode, hasNameTag, 
                componentsCount, canPlaceOnCount, canDestroyCount, dynamicPropertiesCount
            ] = JSON.parse(n.continue());
            const item = new ItemStack(typeId, amount);
            if(ItemStackSupportLevel.keepOnDeath) item.keepOnDeath = keepOnDeath;
            if(ItemStackSupportLevel.lockMode) item.lockMode = lockMode;
            if(hasNameTag) item.nameTag = n.continue();
            const lore = JSON.parse(n.continue());
            if(ItemStackSupportLevel.lore) item.setLore(lore);
            let i = componentsCount;
            while(i--) {
                const [id,data] = JSON.parse(n.continue());
                ItemComponentDeserializers[id](item.getComponent(id), data);
            }
            i = canPlaceOnCount;
            const canPlaceOn = [];
            while(i--) canPlaceOn.push(n.continue());
            i = canDestroyCount;
            const canDestroy = [];
            while(i--) canDestroy.push(n.continue());
            item.setCanPlaceOn(canPlaceOn);
            item.setCanDestroy(canDestroy);
            i = dynamicPropertiesCount;
            while(i--) {
                const [k,sata] = Readable(n.continue());
                item.setDynamicProperty(k,JSON.parse(sata));
            }
            return item;
        }
    );

    if(Vector) Serializer.setSerializableClass(Vector, APISerializableKinds.Vector, function(s){const {x,y,z} = s; return Object.Serialize({x,y,z});}, function(n){const {x,y,z} = Object.Deserialize(n);return new Vector(x,y,z);})
};
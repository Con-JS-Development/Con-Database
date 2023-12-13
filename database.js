import { world, World, Entity } from "@minecraft/server";
const mc_world = world;
const {setDynamicProperty: wSDP, getDynamicProperty: wGDP, getDynamicPropertyIds: wGDPI} = World.prototype;
const {isValid: isValidEntity, setDynamicProperty: eSDP, getDynamicProperty: eGDP, getDynamicPropertyIds: eGDPI} = Entity.prototype;
const DYNAMIC_DB_PREFIX = "\u1221\u2112";
const SOURCE_INSTANCES = new WeakMap();
const DDB_SUBINSTANCES = new WeakMap();
const STRING_LIMIT = 32e3;
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
    getDynamicPropertyIds(){return this.gDPI.call(this.source);}
    /**@param {string} key  @returns {number | boolean | string | import("@minecraft/server").Vector3}*/
    getDynamicProperty(key){return this.gDP.call(this.source,key);}
    /**@param {string} key */
    setDynamicProperty(key,value){ this.sDP.call(this.source, key, value);}
    /**@param {string} key @returns {boolean}  */
    deleteDynamicProperty(key){this.sDP.call(this.source, key, undefined); return true;}
    /**@returns {boolean}  */
    isValid(){ return this.source === world || isValidEntity.call(this.source); }
}
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
        for (const K of SOURCE.getDynamicPropertyIds()) if(K.startsWith(PRE)) {
            const key = K.substring(LENGTH);
            const value = SOURCE.getDynamicProperty(K);
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
        this._source.setDynamicProperty(this._prefix + key, data);
        return super.set(key,value);
    }
    /**@param {string} key  */
    delete(key){
        if(!this.isValid()) throw new ReferenceError("This database instance is no longer valid");
        if(!this.has(key)) return false;
        this._source.deleteDynamicProperty(this._prefix + key);
        return super.delete(key);
    }
    clear(){
        if(!this.isValid()) throw new ReferenceError("This database instance is no longer valid");
        const P = this._prefix;
        const s = this._source;
        for(const key of this.keys()) s.deleteDynamicProperty(P + key);
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
        super();
        this._source = source;
        const PRE = `${kind}${DYNAMIC_DB_PREFIX}${id}${DYNAMIC_DB_PREFIX}`, LENGTH = PRE.length;
        this._prefix = PRE;
        this._prefixLength = LENGTH;
        this._STRINGIFY = parser.stringify;
        this._PARSE = parser.parse;
    }
    clear(){ for( const k of this.__getKeys()) yield this._source.setDynamicProperty(k, undefined); };
    /**
     * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
     */
    delete(key) {
        const has = this.has(key);
        this._source.setDynamicProperty(this._prefix + key, undefined);
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
    get(key){ const a = this._source.getDynamicProperty(this._prefix + key); typeof a === "string"?this._PARSE(a):a; };
    /**
     * @returns boolean indicating whether an element with the specified key exists or not.
     */
    has(key){ return this._source.getDynamicProperty(this._prefix + key)!==undefined; }
    /**
     * Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
     */
    set(key, value){
        this._source.setDynamicProperty(this._prefix + key, this._STRINGIFY(value));
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
    *entries(){for( const k of this.__getKeys()) yield [k.substring(this._prefixLength),this._PARSE(this._source.getDynamicProperty(k))]};
    /**
     * Returns an iterable of keys in the map
     */
    *keys(){for( const k of this.__getKeys()) yield k.substring(this._prefixLength);};
    /**
     * Returns an iterable of values in the map
     */
    *values(){for( const k of this.__getKeys()) yield this._PARSE(this._source.getDynamicProperty(k));}
    *__getKeys(){ for (const K of this._source.getDynamicPropertyIds()) if(K.startsWith(this._prefix)) yield K; }
}
export class JsonDatabase extends DynamicDatabase{ 
    /**@param {World | Entity} source @param {string} id  */
    constructor(source, id){ super(source, id, "JSON", JSON); } 
}
export class WorldDatabase extends JsonDatabase {
    /**@param {string} id  */
    constructor(id){ super(mc_world, id); }
}
export class JSONDynamicWrapper extends DynamicWrapper{ constructor(source, id){ super(source, id, "JSON", JSON); } }
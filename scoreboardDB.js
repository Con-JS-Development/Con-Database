import { MinecraftDimensionTypes, ScoreboardIdentity, ScoreboardIdentityType, ScoreboardObjective, world } from "@minecraft/server";

const splitKey = '.\n$_', matchRegex = /\.\n\$\_/g;
const {fakePlayer} = ScoreboardIdentityType;
const {parse, stringify} = JSON;
const {scoreboard} = world, overworld=world.getDimension(MinecraftDimensionTypes.overworld);
const db = new Map();
const private_code = Symbol("private-code");

/**
 * @extends {Map<string,any>}
 */
class ScoreboardDB extends Map {
    #id;
    #objective;
    #participants = new Map();
    /**
     * Opens a scoreboard objective and returns a ScoreboardDB instance.
     * @param {string|ScoreboardObjective} objective - The scoreboard objective to open.
     * @param {boolean} createNewObjective - Create new Scoreboard when there is no scoreboard for given id.
     * @returns {ScoreboardDB} The this instance.
     * @static
     */
    static open(objective, createNewObjective = true) {
        return db.get(objective.id) ?? this.create(objective,createNewObjective);
    }
    /**
     * Opens a scoreboard objective and returns a ScoreboardDB instance.
     * @param {string|ScoreboardObjective} objective - The scoreboard objective to open.
     * @param {boolean} createNewObjective - Create new Scoreboard when there is no scoreboard for given id.
     * @static
     * @returns {ScoreboardDB} - The this instance.
     */
    static create(objective, createNewObjective = true){
        const n = new this(objective,createNewObjective,private_code);
        n.update();
        return n;
    }
    /**
     * Creates a new ScoreboardDB instance.
     * @private
     * @param {string|ScoreboardObjective} objective - The scoreboard objective to open.
     * @param {boolean} [createNewObjective=true] - Whether to create a new scoreboard objective if it doesn't exist.
     */
    constructor(objective, createNewObjective, code) {
        if(code !== private_code) throw new ReferenceError("Constructor isn't public, please use Constructor.create(...)");
        super();
        if (typeof objective == "string") {
            console.warn
            let get = scoreboard.getObjective(objective);
            if (get == null && createNewObjective) {
                if (createNewObjective) get = scoreboard.addObjective(objective, objective);
                else throw new ReferenceError(`No such scoreboard objective "${objective}"`);
            }
            objective = get;
        }
        if (!(objective instanceof ScoreboardObjective))
            throw new TypeError("The provided argument is not an instance of ScoreboardObjective");
        if (db.has(objective.id))
            throw new ReferenceError(`Database with id "${objective.id}" already exists. Use Database.open() to open or create a database.`
        )
        db.set(objective.id,this);
        this.#objective = objective;
        this.#id = objective.id;
    }
    update(){
        for (const p of this.#objective.getParticipants()) {
            if (p.type != fakePlayer) continue;
            const [key, value] = p.displayName.split(splitKey);
            const v = parse(value.replaceAll('\\"', '"'));
            super.set(key, v);
            this._onInit(key, p);
        }
    }
    /**
     * Deletes a key from the database.
     * @param {string} key - The key to delete from the database.
     * @returns {boolean} - Whether the key was deleted.
     */
    delete(key) {
        if (key.match(matchRegex))
            throw new TypeError(`Database keys can't include "${splitKey}"`);
        if (!this.has(key)) return false;
        this._onDelete(key);
        return super.delete(key);
    }

    /**
     * Clears the database.
     */
    clear() {
        scoreboard.removeObjective(this.scoreboardObjective);
        this.#objective = scoreboard.addObjective(this.#id, this.#id);
        this._onClear();
        return super.clear();
    }
    /**
     * Returns the participants of the scoreboard objective.
     * @readonly
     * @returns {Map<string,ScoreboardIdentity>} - The participants of the scoreboard objective.
     */
    get participants() {
        return this.#participants;
    }

    /**
     * Returns the id of the scoreboard objective.
     * @readonly
     * @returns {string} - The id of the scoreboard objective.
     */
    get id() {
        return this.#id;
    }

    /**
     * Returns the scoreboard objective.
     * @readonly
     * @returns {ScoreboardObjective} - The scoreboard objective.
     */
    get scoreboardObjective() {
        return this.#objective;
    }
    
    /**@private */
    _onInit(key, participant){
        this.#participants.set(key,participant);
    }
    /**@private */
    _onDelete(key){
        this.#objective.removeParticipant(this.#participants.get(key));
        this.#participants.delete(key);
    }
    /**@private */
    _onClear(){
        this.#participants.clear();
    }
    /**@private */
    set(){return super.set(...arguments);}
}
/**
 * An asynchronous database that extends ScoreboardDB.
 * @extends {ScoreboardDB}
 * @class
 */
export class AsyncScoreboardDatabase extends ScoreboardDB {
    #semaphores = new Map();
    /**
     * @inheritdoc
     * @returns {AsyncScoreboardDatabase}
     */
    static create(objective, createNew = true){return super.create(objective,createNew);}
    /**
     * Sets a value for a key in the database.
     * @param {string} key - The key to set.
     * @param {any} value - The value to set.
     */
    async set(key, value) {
      if (value == undefined) throw new TypeError("Value must be defined");
      if (key.match(matchRegex))
        throw new TypeError(`Database keys can't include "${splitKey}"`);
  
      const build = key + splitKey + stringify(value).replaceAll(/"/g, '\\"');
      if (build.length > 32000) throw new Error(`The value is too large to be set`);
      /**@type {AsyncSemaphore} */
      const semaphore = this.#semaphores.get(key) ?? new AsyncSemaphore();
      const lockId = await semaphore;
      if (this.has(key))
        this.scoreboardObjective.removeParticipant(this.participants.get(key));
      await overworld.runCommandAsync(`scoreboard players set "${build}" "${this.id}" 0`);
      const keyId = key + splitKey;
      const p = this.scoreboardObjective
        .getParticipants()
        .find(({ displayName: n }) => n.startsWith(keyId));
      if (p == undefined) {
        semaphore.release(lockId);
        throw new Error("Value couldn't be set!");
      }
      super.participants.set(key, p);
      super.set(key, value);
      this.#semaphores.set(key, semaphore);
      semaphore.release(lockId);
    }
  
    /**
     * Returns the semaphores of the database.
     * @readonly
     * @returns {Map<string,AsyncSemaphore>} - The semaphores of the database.
     */
    get semaphores() {
        return this.#semaphores;
    }
    /**@private */
    _onInit(key){
        super._onInit(key);
        this.semaphores.set(key,new AsyncSemaphore());
    }
    /**@private */
    _onDelete(key){
        super._onDelete(key);
        this.semaphores.delete(key);
    }
    /**@private */
    _onClear(){
        super._onClear();
        this.semaphores.clear();
    }
}
/**
 * A scoreboard database that extends ScoreboardDB.
 * @extends {ScoreboardDB}
 */
export class ScoreboardDatabase extends ScoreboardDB {
    /**
     * Sets a value for a key in the database.
     * @param {string} key - The key to set.
     * @param {any} value - The value to set.
     * @returns {this} - The ScoreboardDatabase instance.
     */
    set(key, value) {
      if (value == undefined) throw new TypeError("Value must be defined");
      if (key.match(matchRegex))
        throw new TypeError(`Database keys can't include "${splitKey}"`);
      const build = key + splitKey + stringify(value).replaceAll(/"/g, '\\"');
      if (build.length > 32000) throw new Error(`The value is too large to be set`);
      if (this.has(key))
        this.scoreboardObjective.removeParticipant(this.participants.get(key));
      overworld.runCommand(`scoreboard players set "${build}" "${this.id}" 0`);
      const keyId = key + splitKey;
      const p = this.scoreboardObjective
        .getParticipants()
        .find(({ displayName: n }) => n.startsWith(keyId));
      if (p == undefined) throw new Error("Value couldn't be set!");
      super.participants.set(key, p);
      return super.set(key, value);
    }
    /**
     * @inheritdoc
     * @returns {ScoreboardDatabase}
     */
    static create(objective, createNew = true){return super.create(objective,createNew);}
}

/**
 * An implementation of an asynchronous semaphore that implements the PromiseLike interface.
 * The Class From Con-Module: https://github.com/Con-JS-Development/Con-Module
 * @implements {PromiseLike}
 */
class AsyncSemaphore {
    #promise;
    #id;
    #map;

    constructor() {
        this.#promise = Promise.resolve();
        this.#id = 0;
        this.#map = new Map();
    }

    /**
     * Releases the lock with the given id.
     * @param {number} id - The id of the lock to release.
     * @returns {boolean} - Returns true if the lock was released successfully.
     * @throws {ReferenceError} - Throws an error if the given id is invalid.
     */
    release(id) {
        if (!this.#map.has(id)) throw new ReferenceError("Invalid promise id resolved!");
        const res = this.#map.get(id);
        this.#map.delete(id);
        res();
        return true;
    }

    /**
     * Acquires a lock and returns its id.
     * @async
     * @returns {Promise<number>} - Returns a promise that resolves with the id of the acquired lock.
     */
    async lock() {
        const promise = this.#promise;
        const id = this.#id++;
        this.#promise = new Promise((res) => this.#map.set(id, res));
        await promise;
        return id;
    }
    /**
     * @async
     * @template {[]} args
     * @param {(...args)=>any} method @param {...args} params
     * @returns {Promise}
     */
    async secureRun(method, ...params){
        const id = await this.lock();
        try {
            await method(...params);
        } catch (error) {
            console.error(error,error.stack);
        }
        this.release(id);
    }
    /**
     * Attaches a callback for when a lock is acquired. This allows the `AsyncSemaphore` instance to be used as a `PromiseLike` object.
     * @type {Promise<number>['then']} - Returns a promise that resolves with the result of the callback.
     */
    get then() {
        const promise = this.lock();
        return Promise.prototype.then.bind(promise);
    }
}
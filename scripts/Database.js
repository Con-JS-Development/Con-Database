import { world, Scoreboard, ScoreboardObjective } from "mojang-minecraft"

const scoreSymbol = Symbol('scores'), nameSymbol = Symbol('name'), dbTypeSymbol = Symbol('dbType');
const overworld = world.getDimension('overworld'), {scoreboard} = world, fakeMaxLength = 31000;
const defaultType = 'Type:default', extendedType = 'Type:extended';

class DB extends Map{
    constructor(name,type){
        if(typeof(name)!=='string') throw new TypeError('Name is not a string.');
        if(name.length>12) throw new Error('Name for this DB is too large.');
        if(name.match(/[\0]/g)?.length>0) throw new Error('Invalid character mach in the name of the Database.');
        super();
        this[nameSymbol] = name;
        this[scoreSymbol] = getObjective(name,type);
        this[dbTypeSymbol] = type;
    }
    clear(){
        scoreboard._removeObjective(this[nameSymbol]);
        scoreboard._addObjective(this[nameSymbol],this[dbTypeSymbol]);
        this[scoreSymbol] = getObjective(this[nameSymbol],this[dbTypeSymbol]);
        super.clear();
    }
    get sizeAll(){return [...this.entriesAll()].length??0;}
    get name(){return this[nameSymbol];}
    get objective(){return this[scoreSymbol];}
    loadAll(){return [...this.entriesAll()];}
    forEachAll(callBack){for (const [key,value] of this.entriesAll()) try{callBack(value,key,this);}catch{}}
    *keysAll(){for (const [key,value] of this.entriesAll()) yield key;}
    *valuesAll(){for (const [key,value] of this.entriesAll()) yield value;}
    hasAll(key){if(super.has(key)) return true; for (const [theKey] of this.entriesAll()) if(theKey === key) return true; return false;}
}
export class Database extends DB{
    constructor(name,instantLoad=false){
        super(name,defaultType);
        console.warn(defaultType);
        const t = new Date().getTime();
        if(instantLoad) this.loadAll();
        console.warn('Load: ' + (new Date().getTime() - t) + ' ms');
    }
    delete(key){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        super.delete(key);
        for (const identity of this[scoreSymbol].getParticipants()) {
            if(identity.displayName.split('+:_')[0] === key) return this[scoreSymbol].resetScoreTarget(identity);
        }
        return false;
    }
    get(key){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if (super.has(key)) return super.get(key);
        let raw = "";
        for (const identity of this[scoreSymbol].getParticipants()) {
            const {displayName,type} = identity;
            if ((displayName.split('+:_')[0] == key) && type == 3) {
                raw = displayName.substring(key.length + 3);
                break;
            }
        }
        if(raw==="") return;
        const data = JSON.parse(raw.getModify());
        super.set(key,data);
        return data;
    }
    set(key,value){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if(key.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('invalid key name: ' + key);
        const raw = JSON.stringify(value);
        if(raw.length>fakeMaxLength) throw new Error(`value large (${raw.length} !< ${fakeMaxLength}), If you need to save more data per property use Extended Database.`);
        this.delete(key);
        this[scoreSymbol].setScoreTarget(key+ "+:_" + raw);
        return super.set(key,value);
    }
    *entriesAll(){
        for (const {displayName} of this[scoreSymbol].getParticipants()) {
            const key = displayName.split('+:_')[0];
            const value = JSON.parse(displayName.substring(key.length + 3).getModify());
            super.set(key,value);
            yield [key,value];
        }
    }
}
export class ExtendedDatabase extends DB{
    constructor(name,instantLoad=false){
        super(name,extendedType);
        const t = new Date().getTime();
        if(instantLoad) this.loadAll();
        console.warn('Load: ' + (new Date().getTime() - t) + ' ms');
    }
    delete(key){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        super.delete(key);
        let isLast = false;
        for (const identity of this[scoreSymbol].getParticipants()) {
            if(identity.displayName.split('+:_')[0] === key) {
                this[scoreSymbol].resetScoreTarget(identity);
                isLast = true;
            } else if(isLast) return true;
        }
        return false;
    }
    get(key){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if (super.has(key)) return super.get(key);
        let raw = "", isLast = false;
        for (const identity of this[scoreSymbol].getParticipants()) {
            const {displayName,type} = identity;
            if ((displayName.split('+:_')[0] === key) && type == 3) {
                raw += displayName.substring(key.length + 4);
                isLast = true;
            } else if(isLast) break;
        }
        if(raw==="") return;
        const data = JSON.parse(raw.getModify());
        super.set(key,data);
        return data;
    }
    set(key,value){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if(key.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('invalid key name: ' + key);
        const raw = JSON.stringify(value);
        this.delete(key);
        for (let i = 1, Min = 0; i<65500; i++, Min+=fakeMaxLength) {
            const Current = raw.substring(Min,Min + fakeMaxLength);
            if (Current == "") break;
            this[scoreSymbol].setScoreTarget(key + "+:_" + String.fromCharCode(i) + raw);
        }
        return super.set(key,value);
    }
    *entriesAll(){
        let database = {};
        let isLast = false;
        for (const identity of this[scoreSymbol].getParticipants()) {
            const {displayName,type} = identity;
            const key = displayName.split('+:_')[0];
            if (type == 3) {
                database[key] = (database[key]??"") + displayName.substring(key.length + 4);
            }
        }
        for(const [key,value] of Object.entries(database)){
            console.warn(key,value.getModify());
            const data = JSON.parse(value.getModify());
            yield [key,data];
            super.set(key,data);
        }
    }
}
function getObjective(n,d = undefined){
    const c = scoreboard.getObjective(n);
    if(c!==null) if(c.displayName===d||d===undefined) return c;
    try {
        scoreboard._addObjective(n,d);
        return getObjective(n,d);
    } catch (er) {
        throw er;
    }
}

Object.assign(String.prototype,{
    setModify(){return this.replaceAll('\\','\\\\').replaceAll(/"/g,'\\"');},
    getModify(){return this.replaceAll('\\\\','\\').replaceAll(/\\"/g, '"');}
});
Object.assign(Scoreboard.prototype,{
    _addObjective(id,displayName){overworld.runCommand(`scoreboard objectives add "${id.setModify()}" dummy ${displayName!==undefined?`"${displayName.setModify()}"`:""}`);},
    _removeObjective(id){overworld.runCommand(`scoreboard objectives remove "${id.setModify()}"`);}
});
Object.assign(ScoreboardObjective.prototype,{
    resetScoreTarget(identity){try {overworld.runCommand(`scoreboard players reset "${identity.displayName}" "${this.id}"`);return true;}catch{return false;}},
    setScoreTarget(target,score=0){overworld.runCommand(`scoreboard players set "${target.setModify()}" "${this.id.setModify()}" ${score}`);}
});
import { world, Scoreboard, ScoreboardObjective } from "mojang-minecraft"

const scoreSymbol = Symbol('scores'), nameSymbol = Symbol('name');
const overworld = world.getDimension('overworld'), {scoreboard} = world, fakeMaxLength = 31000;

export class Database extends Map{
    constructor(name,instantLoad=false){
        if(typeof(name)!=='string') throw new TypeError('Name is not a string.');
        if(name.length>12) throw new Error('Name for this DB is too large.');
        if(name.match(/[\0]/g)?.length>0) throw new Error('Invalid character mach in the name of the Database.');
        const t = new Date().getTime();
        super();
        this[scoreSymbol] = getObjective(name);
        this[nameSymbol] = name;
        if(instantLoad) this.load();
        console.warn('Load: ' + (new Date().getTime() - t) + ' ms');
    }
    get name(){
        return this[nameSymbol];
    }
    get objective(){
        return this[scoreSymbol];
    }
    get sizeAll(){return [...this.entriesAll()].length??0;}
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
        const data = JSOn.parse(raw.getModify());
        super.set(key,data);
        return data;
    }
    set(key,value){
        if (typeof(key)!=='string') throw new TypeError('key is not a string.');
        if(key.match(/(\+\:\_)|["\\\n\r\t\0]/g)?.length>0) throw new Error('invalid key name: ' + key);
        this.delete(key);
        const raw = JSON.stringify(value);
        if(raw.length>fakeMaxLength) throw new Error('value large, If you need to save more data per property use Extended Database.');
        this[scoreSymbol].setScoreTarget(key+ "+:_" + raw);
        return super.set(key,value);
    }
    clear(){
        scoreboard._removeObjective(this[nameSymbol]);
        scoreboard._addObjective(this[nameSymbol]);
        this[scoreSymbol] = getObjective(this[nameSymbol]);
        super.clear();
    }
    hasAll(key){
        if(super.has(key)) return true;
        for (const {displayName} of this[scoreSymbol].getParticipants()) {
            const theKey = displayName.split('+:_')[0];
            super.set(key,JSON.parse(displayName.substring(key.length + 3).getModify()));
            if(theKey === key) return true;
        }
        return false;
    }
    *entriesAll(){
        for (const {displayName} of this[scoreSymbol].getParticipants()) {
            const key = displayName.split('+:_')[0];
            const value = JSON.parse(displayName.substring(key.length + 3).getModify());
            super.set(key,value);
            yield [key,value];
        }
    }
    *keysAll(){
        for (const [key,value] of this.entriesAll()) yield key;
    }
    *values(){
        for (const [key,value] of this.entriesAll()) yield value;
    }
    forEachAll(callBack){
        for (const [key,value] of this.entriesAll()) try{callBack(value,key,this);}catch{}
    }
    load(){
        [...this.entriesAll()];
        return this;
    }
}
function getObjective(n){
    const c = scoreboard.getObjective(n);
    if(c!==null) return c;
    try {
        scoreboard._addObjective(n);
        return getObjective(n);
    } catch (er) {
        er.message = `invalid objective name!: ${er.message}`;
        throw er;
    }
}

Object.assign(String.prototype,{
    setModify(){return this.replaceAll('\\','\\\\').replaceAll(/"/g,'\\"');},
    getModify(){return this.replaceAll('\\\\','\\').replaceAll(/\\"/g, '"');}
});
Object.assign(Scoreboard.prototype,{
    _addObjective(id){overworld.runCommand(`scoreboard objectives add "${id.setModify()}" dummy`);},
    _removeObjective(id){overworld.runCommand(`scoreboard objectives remove "${id.setModify()}"`);}
});
Object.assign(ScoreboardObjective.prototype,{
    resetScoreTarget(identity){try {overworld.runCommand(`scoreboard players reset "${identity.displayName}" "${this.id}"`);return true;}catch{return false;}},
    setScoreTarget(target,score=0){overworld.runCommand(`scoreboard players set "${target.setModify()}" "${this.id.setModify()}" ${score}`);}
});
import {world, ScoreboardObjective,ScoreboardIdentityType, ScoreboardIdentity,system, Entity} from "@minecraft/server";
import {NBT} from "./nbt-serializer";

const {scoreboard} = world, {FakePlayer} = ScoreboardIdentityType;
const split = "\n_`Split`_\n";
function endTickCall(callback){
    system.run(()=>system.run(()=>system.run(callback)));
}
export const DatabaseSavingModes = {
    OneTimeSave:"OneTimeSave",
    EndTickSave:"EndTickSave",
    TickInterval:"TickInterval"
}
const ChangeAction = {
    Change:0,
    Remove:1
}
function run(thisClass,key,value,action){
    if(thisClass._source_.has(key)) thisClass._scoreboard_.removeParticipant(thisClass._source_.get(key));
    if(action === ChangeAction.Remove) thisClass._source_.delete(key);
    else{
        thisClass._source_.set(key,value);
        thisClass._scoreboard_.setScore(value,0);
    }
}
const SavingModes = {
    [DatabaseSavingModes.OneTimeSave](thisClass,key,value,action){
        run(thisClass,key,value,action);
    },
    /**@param {ScoreboardDatabaseManager} thisClass */
    [DatabaseSavingModes.EndTickSave](thisClass,key,value,action){
        if(!thisClass.hasChanges){
            endTickCall(()=>{
                for (const [k,{action,value}] of thisClass._changes_.entries()) {        
                    run(thisClass,k,value,action);
                }
                thisClass._changes_.clear();
                thisClass.hasChanges = false;
            });
        }
        thisClass.hasChanges = true;
        thisClass._changes_.set(key,{action,value});
    },
    /**@param {ScoreboardDatabaseManager} thisClass */
    [DatabaseSavingModes.TickInterval](thisClass,key,value,action){
        thisClass.hasChanges = true;
        thisClass._changes_.set(key,{action,value});
    }
}
class ScoreboardDatabaseManager extends Map{
    /**@private */
    _saveMode_;
    /**@private */
    hasChanges = false;
    /**@readonly */
    get maxLength(){return 32e3;}
    /**@private @type {ScoreboardObjective}*/
    _scoreboard_;
    /**@protected @type {Map<string,string|ScoreboardIdentity|Entity>} */
    _source_;
    /**@protected @readonly @type {{stringify:(data: any)=>string,parse:(data: string): any}} */
    get _parser_(){return JSON;}
    get savingMode(){return this._saveMode_;}
    /**@protected */
    constructor(objective, saveMode = DatabaseSavingModes.EndTickSave, interval=5){
        super();
        this._saveMode_ = saveMode;
        this.interval = interval??5;
        if(!objective) throw new RangeError("Firt parameter si not valid: " + objective);
        if(typeof objective !== "string" && !objective instanceof ScoreboardObjective) throw new RangeError("Firt parameter si not valid: " + objective);
        this._scoreboard_ = typeof objective === "string"?(scoreboard.getObjective(objective)??scoreboard.addObjective(objective,objective)):objective;
        this._source_ = new Map();
        for (const participant of this._scoreboard_.getParticipants()) {
            const {displayName,type} = participant;
            if(type !== FakePlayer) continue;
            const [name,data] = displayName.split(split);
            this._source_.set(name,participant);
            super.set(name,this._parser_.parse(data));
        }
        this._changes_ = new Map();
        if(this._saveMode_ === DatabaseSavingModes.TickInterval){
            system.runInterval(()=>{
                if(!this.hasChanges){
                    endTickCall(()=>{
                        for (const [k,{action,value}] of this._changes_.entries()) run(this,k,value,action);
                        this._changes_.clear();
                        this.hasChanges = false;
                    })
                }
            },this.interval);
        }
    }
    /**@inheritdoc */
    set(key, value){
        const newValue = `${key}${split}${this._parser_.stringify(value)}`;
        if(newValue.length > this.maxLength) throw new RangeError("Value is too large for one property");
        super.set(key,value);
        this._onChange_(key,value,ChangeAction.Change);
        return this;
    }
    /**@inheritdoc */
    delete(key){
        this._onChange_(key,null,ChangeAction.Remove);
        return super.delete(key);
    }
    clear(){ for (const [key,value] of this.entries()) this.delete(key,value);}
    /**@private */
    _onChange_(key, value, action){
        SavingModes[this._saveMode_](this,key,value,action);
    }
    /**@readonly @returns {ScoreboardObjective} */
    get objective(){return this._scoreboard_;}
    /**@readonly @returns {string} */
    get id(){return this._scoreboard_.id;}
}
export class JsonDatabase extends ScoreboardDatabaseManager{}
export class NBTDatabase extends ScoreboardDatabaseManager{
    get _parser_() {return NBT;};
}
function generateRandomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
function numberRandge(number,length,radix = 16){
    const toStr = number.toString(radix);
    if(toStr.length < length) return "0".repeat(length - toStr.length) + toStr;
    else return toStr;
}
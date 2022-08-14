import {Database} from './Database.js';
import {world} from 'mojang-minecraft';


world.events.beforeChat.subscribe(eventData=>{
    if(!eventData.message.startsWith('-')) return;
    switch (eventData.message.toLowerCase()) {
        case "-delete":
            for (const [key,value] of db) {
                db.delete(key);
            }
            break;
        case '-clear':
            db.clear();
            break;
        default:
            break;
    }
    eventData.cancel = true;
});
const p = 'YourMum';
const db = new Database('MyOwnDB',false);
db.hasAll(p)?console.warn('Init'):console.warn(db.set(p,{MYBestString:'"HelloBros "i nee\0d our he\\lp'}));
console.warn(db.get(p).MYBestString);
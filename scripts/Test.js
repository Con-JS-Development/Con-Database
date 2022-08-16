import {Database, ExtendedDatabase} from './Database.js';
import {world} from 'mojang-minecraft';

const db = new ExtendedDatabase('YaMyItsName');
world.events.beforeChat.subscribe(eventData=>{
    if(!eventData.message.startsWith('-')) return;
    const {onScreenDisplay} = eventData.sender;
    const t = new Date();
    switch (eventData.message.toLowerCase()) {
        case "-deleteall":
            for (const [key,value] of db) {
                db.delete(key);
            }
            break;
        case '-clear':
            db.clear();
            break;
        case '-add':
            db.set('RandomKey: ' + (Math.random() * 100).toFixed(2),'SomeAditionalText ya it true: ' + Math.random());
            break;
        case '-load':
            db.loadAll();
            break;
        case '-foreach':
            for (const [key,value] of db.entriesAll()) {
                onScreenDisplay.setActionBar(key + " " + value);
            }
            break;
        case '-keys':
            for (const key of db.keysAll()) {
                onScreenDisplay.setActionBar(key);
            }
            break;
        case '-values':
            for (const key of db.valuesAll()) {
                onScreenDisplay.setActionBar(key);
            }
            break;
        case '-console':
            for (let i = 0; i<500; i++) {
                eventData.sender.runCommand('tellraw @s ' + JSON.stringify({rawtext:[{text:"times: " +i}]}));
            }
            break;
        default:
            break;
    }
    console.warn('Perform: ' + (new Date() - t) + 'ms');
    eventData.cancel = true;
});
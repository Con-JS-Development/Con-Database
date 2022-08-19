import {Database, ExtendedDatabase} from './Database.js';
import {world} from 'mojang-minecraft';

const db = new Database('YaMyItsName2');
world.events.beforeChat.subscribe(eventData=>{
    if(!eventData.message.startsWith('-')) return;
    const {onScreenDisplay} = eventData.sender;
    const t = new Date();
    let n = "";
    switch (eventData.message.toLowerCase()) {
        case "-deleteall":
            for (const [key,value] of db) db.delete(key);
            break;
        case '-clear':
            db.clear();
            break;
        case '-add':
            for (let i = 0; i < 50; i++) db.set('RandomKey: ','SomeAditionalText ya its true.');
            break;
        case '-get':
            for (let i = 0; i < 50; i++) db.get('RandomKey: ');
            break;
        case '-load':
            for (let i = 0; i < 50; i++) db.loadAll();
            break;
        case '-foreach':
            for (let i = 0; i < 50; i++) for (const [key,value] of db.entriesAll()) n = v;
            break;
        case '-keys':
            for (let i = 0; i < 50; i++) for (const v of db.keysAll()) n = v;
            break;
        case '-values':
            for (let i = 0; i < 50; i++) for (const v of db.valuesAll()) n = v;
            break;
        default:
            console.warn('InvalidCommand');
            break;
    }
    console.warn('Perform: ' + (new Date() - t) + 'ms');
    eventData.cancel = true;
});
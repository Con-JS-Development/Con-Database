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
        case '-add':
            db.set('RandomKey: ' + (Math.random() * 100).toFixed(2),max);
            break;
        case '-load':
            db.load();
            break;
        default:
            break;
    }
    eventData.cancel = true;
});
const p = 'YourMum';
const max = {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance.",array:[
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend your best friend everyone best friend i am not sure if i an do mre then other peoples ya its true but we need better performance."},
    {This:"MyBestFriend you645r best friend 5445veryone best friend45464 i am not sure if i an do mre then ot4564656her peoples ya its true but we need better perfo466454rmance."}
]};
const db = new Database('MyOwnDB',false);
db.hasAll(p)?console.warn('Init'):console.warn(db.set(p,{MYBestString:'"HelloBros "i nee\0d our he\\lp'}));
console.warn(db.get(p).MYBestString);
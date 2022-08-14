import {get,set} from './Database.js';
import {world} from 'mojang-minecraft';
import { NBT } from './NBT.js';

world.events.chat.subscribe(({sender,message})=>{
        NBTTest(100);
        JSONTest(100);
});
world.say = function(t){
    world.getDimension('overworld').runCommandAsync('tellraw @a ' + JSON.stringify({rawtext:[{text:t}]}));
}
const TestObject = {myTest:"MyBest Test",number:54891354,boolean:true,YourMum:{isMom:false,isDad:true},YourFace:["Yes",true,false,55480,54640],copy:{myTest:"MyBest Test",number:54891354,boolean:true,YourMum:{isMom:false,isDad:true},YourFace:["Yes",true,false,55480,54640],copy:{myTest:"MyBest Test",number:54891354,boolean:true,YourMum:{isMom:false,isDad:true},YourFace:["Yes",true,false,55480,54640],copy:{myTest:"MyBest Test",number:54891354,boolean:true,YourMum:{isMom:false,isDad:true},YourFace:["Yes",true,false,55480,54640]}}}};
function NBTTest(count){
    const t = new Date().getTime();
    for (let i = 0; i < count; i++) {
        NBT.decode(NBT.code(TestObject));
    }
    world.say(`NBT:  ${new Date().getTime() - t} ms`);
    world.say("Length: " + NBT.code(TestObject).length);
}
function JSONTest(count){
    const t = new Date().getTime();
    for (let i = 0; i < count; i++) {
        JSON.parse(JSON.stringify(TestObject));
    }
    world.say(`JSON:  ${new Date().getTime() - t} ms`);
    world.say("Length: " + JSON.stringify(TestObject).length);
}
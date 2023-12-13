# Con-Databases
New version of JsonDatabase is based on dynamic properties. 
This database supports all possible [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) class operations from ECMAScript.
- [Starting Using Con-Databases](./docs/HOW_TO_SETUP.md)
- [Basic API documentation](./docs/API-Documentation.md)

### Inherited from Map
 - size: number of properties
 - [Symbol.iterator]: is iterable [key, value]
 - clear(): clear all values
 - delete(key: string): delete specific value
 - entries(): generator of all values [key, value]
 - forEach(callBack: (value, key, this)=>void): for each all elements and call provided function for that
 - get(key: string): returns value for specific key
 - set(key: string: value: any): sets new value for provided key
 - has(key: string): returns true when database has a value for that key
 - keys(): returns iterbale of keys
 - values(): returns iterable of values
### Additional Methods & Properties
 - dispose(): dispose the current instance of database anc clears it chache, saved data are not lost!
 - isValid(): returns true when source is valid and database is not disposed
 - isDisposed: property returns if database is disposed
# Other examples

### Dual instance security!
```js
const myDB1 = new JsonDatabase(world,"sameId");
const myDB2 = new WorldDatabase("sameId"); //returns JsonDatabase because database with same id "sameId" and same source was already created.

console.log(myDB1 === myDB2); //true the very same instance!
``` 

### Example
```js
import {world} from "@minecraft/server";
import {JsonDatabase} from "./con-database.js";

const db = new WorldDatabase("my id");

db.set("key1", "value1");
db.set("key2", {isComplexObject: true});

console.warn(db.get("key1")); // "value1"

db.delete("key1");

console.warn(db.get("key1")); // undefined

// Iterating over the map using for loop
for (const [key, value] of db) {
  console.warn(`${key} = ${value}`);
}

db.clear();

// Getting the size of the map
console.warn(db.size); // 0
```
## Example saving deaths for each player
Each key is unique to its player because key include players id, so database keys looks like
```
5648463deaths
6843684deaths
6545463deaths
```
Code
```js
import {world} from "@minecraft/server";
import {WorldDatabase} from "databases.js";

const stats = new WorldDatabase("playerStats");

world.afterEvents.entityDie.subscribe(({deadEntity})=>
    setDeaths(deadEntity,getDeaths(deadEntity) + 1);
,{entityTypes:["mineraft:player"]});


function getDeaths(player){ 
    return stats.get(player.id + "deaths")??0;}

function setDeaths(player,deaths){ 
    stats.set(player.id + "deaths",deaths);}
```
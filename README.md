# Con-Databases
This package contains three types of databases, JsonDatabase, NBTDatabase, CustomDatabase. 
Each of these database types supports all possible [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) class operations from ECMAScript, which means.
- [Starting Using Con-Databases](./docs/HOW_TO_SETUP.md)
- [Using CustomDatabase](./docs/CUSTOM_DATABASE.md)  *(Soon)*

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
### Additional Methods
 - load(): will load database from provided scoreboard
 - loadAsync(): will load database asynchonously from provided scoreboard
 - rebuild(): when database is deleted by user in the world you can call rebuild to save loaded data without lost
 - rebuildAsync(): same as rebuild() but asyncronouse
### Additional Properties
 - objective: returns scoreboard objective what is database binded to
 - id: returns id of the objective
 - loaded: returns boolean, true when database is loaded
 - maxLength: max size of key and value after parsed via parse
 - savingMode: mode when your database is saving your data after change
   - OneTimeSave: Saving after value was changed
   - EndTickSave: Saving at the end of the tick, ater any changes occurs
   - IntervalTick: Saving Every interval if changes occurs

### Database Types
 - JsonDatabase, is saving data in JSON form. (SuperFast/EasyToRead)
 - NBTDatabase, is saving data in NBT form. (Fast/HardToRead)
 - Custom, is saving data in format of provided parser (undefined/undefined)

### Dual instance security!
```js
const myDB1 = new JsonDatabase("sameId");
const myDB2 = new NBTDatabase("sameId"); //returns JsonDatabase because database with same id "sameId" was already created.

console.log(myDB1 === myDB2); //true the very same instance!
``` 

### Example
```js
// INITIALIZATION OF DATABASE
const myDB = new JsonDatabase("MyIdentifier").load();
const myDB = new NBTDatabase("MyIdentifier2").load();
const myDB = new CustomDatabase(JSON /* JSON is parser */,"MyIdentifier3").load();

//using (get/set) to (read/write) data (from/to) database
const worldOpenedCount = myDB.get("openCount")??0;
myDB.set("openCount", ++worldOpenedCount);

//getting all data saved in database
for(const [key, value] of myDB.entries()){
    console.warn(key, value);
}

//clearing database
myDB.clear();

//removing specific value
myDB.delete("Josh");

//forEaching every element in scoreboard
myDB.forEach((value,key)=>{
    console.warn(key, value);
});
```
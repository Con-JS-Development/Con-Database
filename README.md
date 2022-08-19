# Database - ExtendedDatabase
The runtime the database methods are the same as the ([Map class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)) ones.
What do runtime methods mean? These are methods to manipulate the database with the loaded values. so if the database is not loaded when the has() method is called, false will be returned. but if you want direct access, you need to either load the entire database (not recommended) or use methods (All). The All methods are bound to real values, which means that the database does not have to be loaded and data from the native database can be cleaned directly from them, but it is much slower.
### RunTime Methods:
```ts
has(key: string): boolean //if loaded property exists

clear(): void //if delete all of the properties loaded and unloaded

keys(): Generator<string> //returning loaded keys

values(): Generator<any> //returning loaded values

entries(): Generator<[string, any]> //returning loaded entries

forEach(callback: delegate(value: any, key: string, map: (ExtendedDatabase | Database))=>void): void //for each all loaded entries

[Symbol.iterator](): Generator<[string, any]> //returning loaded entires
```

### Native Methods: *( Methods - All )*
```ts
entriesAll(): Generator<[key: string, value: any]> //for each all saved entries and load them in to the database

keysAll(): Generator<string> //for each all entries and load them in to the database but returns only keys

valuesAll(): Generator<any>//for each all entries and load them in to the database but returns only values

hasAll(): boolean//for each all entries and load them until correct key has not founed. (dont load all database.)

forEachAll(callback: delegate(value: any, key: string, map: (ExtendedDatabase | Database))=>void): void //for each all entries loaded and unloaded.

loadAll(): this //(instant load - freezing - not recomended) load and return this database (not recomended for huge database with lot of entries) use entriesAll to load DB in the async method.

delete(): boolean //Overrided method from the (Map) class. delete value  with specific key;


get(key: string): any | undefined //Overrided method wrom the (Map) if property loaded return instantly loaded value if not it will try to found property and load it if not then returns undefined
set(key: string, value: any): void //Overrided method from (Map) it will alway reset the property to the current value (most slower method);


//!Method is only eviable for ExtendedDatabase! 
setAsync(key: string, value: any): Promise<void> //!Method is only eviable for ExtendedDatabase! same as sync Set but its await null alway per 31000 chars to make work in progress with less lags
```
### Properties
```ts
readonly name: string //name of the database
readonly objective: ScoreboardObjective //the netive soreboard of the databse
readonly size: string //return count of the loaded properties
readonly sizeAll: number //(slow - not recomended) return all loaded and unloaded prperties count;
```

## Database *class*
 - Max 31000 chars for value per property
 - Max 1000 chars for the key
 - Max 32k Properties per one Database
 - Max 9 900 000 000 chars per Database
  
  
## ExtendedDatabase *class*
 - Max (31k * 32k - 9 900 000 000) chars for value per property
 - Max 1000 chars for the key
 - Max (9 900 000 000) chars per ExtededDatabase
# JsonDatabase

`JsonDatabase` is a subclass of `Map` that provides additional functionality for storing and retrieving data from a dynamic properties.

## Constructor

```javascript
new JsonDatabase(world, "MyId");
```

Creates a new instance of `JsonDatabase`.

### Parameters

- `source` - An instance of the `world` or `entity` class.
- `identifier` - A string that will be used as a identifier for keys in the database.

## Properties

- `isDisposed`: A boolean that indicates whether the database instance has been disposed.

## Methods

### `set(key, value)`

Sets the value of a key in the database.

#### Parameters

- `key` - A string representing the key to set.
- `value` - The value to set for the key.

#### Returns

The `this` instance.

#### Throws

- `ReferenceError` - If the database instance is no longer valid.
- `TypeError` - If the key is too long or if the size of the data in string is too long.

### `delete(key)`

Deletes a key from the database.

#### Parameters

- `key` - A string representing the key to delete.

#### Returns

`true` if the key was deleted, `false` otherwise.

#### Throws

- `ReferenceError` - If the database instance is no longer valid.

### `clear()`

Clears all keys from the database.

#### Returns

The `this` instance.

#### Throws

- `ReferenceError` - If the database instance is no longer valid.

### `isValid()`

Checks if the database instance is valid.

#### Returns

`true` if the database instance is valid, `false` otherwise.

### `dispose()`

Disposes of the database instance.

#### Throws

- `ReferenceError` - If the database instance is no longer valid.

# WorldDatabase

`WorldDatabase` is a subclass of `JsonDatabase` that provides additional functionality for storing and retrieving data from a dynamic properties.

## Constructor

```javascript
new WorldDatabase("My Id");
```
Creates a new instance of `WorldDatabase`.

Using `JsonDatabase` with world as source has same effect as `WorldDatabase`
## Examples

```javascript
import {world} from "@minecraft/server";
import {JsonDatabase} from "./con-database.js";

const db = new JsonDatabase(world, "my id");

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
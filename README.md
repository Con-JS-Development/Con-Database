This documentation describes the `ScoreboardDB`, `AsyncDatabase`, and `ScoreboardDatabase` classes. It also using these classes from [Con-Module](https://github.com/Con-JS-Development/Con-Module):
- The `AsyncSemaphore` from ["Con-Module/Utils/AsyncSemaphore"](https://github.com/Con-JS-Development/Con-Module/blob/main/Docs/con-utils/AsyncSemaphore.md) ([source](https://github.com/Con-JS-Development/Con-Module/blob/main/con-lib/con-utils/Semaphore.js)).

## Internal ScoreboardDB

`ScoreboardDB` is a class that extends [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and provides an interface to interact with a scoreboard objective in Minecraft. It allows you to store key-value pairs in a scoreboard objective and retrieve them later.

### Create

```js
ScoreboardDB.create(objective: string | ScoreboardObjective, createNew?: boolean);
```

Creates a new `ScoreboardDB` instance.

- `objective`: The scoreboard objective to open. Can be a string or a `ScoreboardObjective` instance.
- `createNew`: Optional. Whether to create a new scoreboard objective if it doesn't exist. Defaults to `true`.

### Properties

#### participants

```js
scoreboardDB.participants: Map<string, ScoreboardIdentity>;
```

A read-only property that returns the participants of the scoreboard objective.

#### id

```js
scoreboardDB.id: string;
```

A read-only property that returns the id of the scoreboard objective.

#### scoreboardObjective

```js
scoreboardDB.scoreboardObjective: ScoreboardObjective;
```

A read-only property that returns the scoreboard objective.

### Methods

#### open

```js
ScoreboardDB.open(objective: string | ScoreboardObjective): ScoreboardDB;
```

Opens a scoreboard objective and returns a `ScoreboardDB` instance.

- `objective`: The scoreboard objective to open. Can be a string or a `ScoreboardObjective` instance.
- Returns: The `ScoreboardDB` instance.

#### delete

```js
scoreboardDB.delete(key: string): boolean;
```

Deletes a key from the database.

- `key`: The key to delete from the database.
- Returns: Whether the key was deleted.

#### clear

```js
scoreboardDB.clear(): void;
```

Clears the database.

## Public AsyncDatabase

`AsyncDatabase` is a class that extends `ScoreboardDB` and provides an asynchronous interface to interact with a scoreboard objective in Minecraft. It allows you to store key-value pairs in a scoreboard objective and retrieve them later asynchronously. It is more performant than the synchronous version (`ScoreboardDatabase`) but can be slower when setting values for the same key in one tick.

### Methods

#### set

```js
async asyncDatabase.set(key: string, value: any): Promise<void>;
```

Sets a value for a key in the database asynchronously.

- `key`: The key to set.
- `value`: The value to set.

### Properties

#### semaphores

```js
asyncDatabase.semaphores: Map<string, AsyncSemaphore>;
```

A read-only property that returns the semaphores of the database.

## Public ScoreboardDatabase

`ScoreboardDatabase` is a class that extends `ScoreboardDB` and provides an interface to interact with a scoreboard objective in Minecraft. It allows you to store key-value pairs in a scoreboard objective and retrieve them later synchronously.

### Methods

#### set

```js
scoreboardDatabase.set(key: string, value: any): this;
```

Sets a value for a key in the database synchronously.

- `key`: The key to set.
- `value`: The value to set.
- Returns: The `ScoreboardDatabase` instance.

## Requirements
 - Server Module:
    - `1.2.0-beta`
    - `1.3.0-beta`

### [MIT License](./LICENSE)
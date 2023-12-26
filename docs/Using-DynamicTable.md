# Using DynamicTable
Why should I use DynamicTable? DynamicTable provides far more options and its disadvantages are also advantages. Here are some problems that DynamicTable can solve unlike JsonDatabase.
 - **Value Size** limitation of the size of the value for each of the keys, Dynamictable does not have this limitation, more data can be stored for an individual key than is allowed for the script api to run. -> 100MB
 - **Loading** JsonDatabase is loaded whole on initialization for fast data access, but this can lead to slowness on initialization. Dynamictable loads only the keys and deserializes only when the value is queried. Initialization is very fast, but it does not load all values, it also saves memory.
 - **Serialization APIs** JsonDatabase only uses the specified parse (JSON parse) to process the data. Dynamictable uses different data processing, and you can also create your own parsers that call to serialize classes as well, it makes sense that the data after loading already has a prototype of the class, according to deserialization.

## DynamicTable
Here is a simple example of how to instantiate a DynamicTable and use it. Some native classes can also be serialized, but this function needs to be enabled by calling the function `registryAPISerializers()`.
```js
import { DynamicTable, registryAPISerializers } from "./con-database";
import {ItemStack} from "@minecraft/server";

registryAPISerializers(); //required for serialization of ItemStack
const table = DynamicTable.OpenCreate("id-of-the-table");

table.set("key-the-test", "very long string idk size but realy long, this text x 500000".repeat(500_000));
table.set("key-the-item", new ItemStack("dirt", 32));

const savedValue = table.get("key-the-test");
const savedItem = table.get("key-the-item");
const typeId = savedItem.typeId;

table.delete("key-the-test"); //deletes kkey value
table.clear(); //clears all values and keys form DynamicTable


DynamicTable.ClearAll(); //removes all created DynamicTables
```

## Custom Serializers
Custom serializers could help you keep you data types avaliable even after load, here is example of creating new serialization kind for my class.

```js
import { SerializableKinds } from "./con-database";
import { DynamicTable, Serializer } from "./con-database";


class MyClassWithMethods {
    constructor(id, message){
        this.id = id;
        this.message = message;
    }
    warn(){
        console.warn(this.id,this.message);
    }
}
Serializer.setSerializableClass(
    MyClassWithMethods,
    "custom-kind-id",
    function({id,message}){ // serialization function, called when DynamicTable.set() 
        const objectSerializer = Serializer.getSerializer(SerializableKinds.Object); 
        return objectSerializer({id,message}); //basic serialization as poor object
    },
    function(n){ //deserialization function, called when DynamicTable.get();
        const object = Serializer.getDeserializer(SerializableKinds.Object)(n); //loaded poor object
        return Object.setPrototypeOf(object, MyClassWithMethods.prototype); //add a MyClassWithMethods prototype
    }
)




const table = DynamicTable.OpenCreate("id-of-the-table");
table.set("key-the-test", new MyClassWithMethods("warn-id", "My custom message"));


table.get("key-the-test").warn(); //warn method from MyClasswithMethods
```
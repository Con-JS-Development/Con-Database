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
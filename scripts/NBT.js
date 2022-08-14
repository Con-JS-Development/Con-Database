const ObjectType = 1;
const ArrayType = 2;
const StringType = 3;
const NumberType = 4;
const FloatType = 5;
const BooleanType = 6;
const EndOfObject = 0;
const bigNumber = 7;//undefined

class TextReader {
    constructor(string){
        this.Text = string;
        this.offSet = 0;
    }
    read(count){
        let ret = this.Text.substring(this.offSet,this.offSet+count);
        this.offSet+=count;
        return ret;
    }
    readByte(){
        let ret = this.Text.charCodeAt(this.offSet++);
        return ret;
    }
    peek(count){
        let ret = this.Text.substring(this.offSet,this.offSet+count);
        return ret;
    }
    endOf(){
        return this.offSet>=this.Text.length;
    }
}

const functionWrite = {
    [ArrayType](ArrayObject){
        if (Array.isArray(ArrayObject)) {
            let stringRet = "";
            stringRet = GetChar(ArrayObject.length);
            ArrayObject.forEach((value)=>{
                stringRet += GetChar(GetType(value));
                stringRet += Write(value);
            });
            return stringRet;
        }
        throw new Error('code: is not Array');
    },
    [ObjectType](objectParam){
        if (typeof(objectParam)=='object' & !Array.isArray(objectParam)) {
            let stringRet = "";
            for (const [key, value] of Object.entries(objectParam)) {
                stringRet += GetChar(GetType(value));
                stringRet += GetChar(key.length);
                stringRet += key;
                stringRet += Write(value);
            }
            stringRet += GetChar(EndOfObject);
            return stringRet;
        }
        throw new Error('code: is not object');
    },
    [StringType](StringParam){
        return GetChar(StringParam.length) + StringParam;
    },
    [NumberType](NumberParam){
        let charcode1 = 0xffff & NumberParam;
        let charcode2 = 0xffff & (NumberParam>>16);
        return GetChar(charcode1 + 1,charcode2 + 1);
    },
    [FloatType](NumberParam){
        const [num1,num2] = String(NumberParam).split('.');
        let charcode1 = 0xffff & num1;
        let charcode2 = 0xffff & (num1>>16);
        let charcode3 = 0xffff & num2;
        let charcode4 = 0xffff & (num2>>16);
        return GetChar(charcode1+1,charcode2+1,charcode3+1,charcode4+1);
    },
    [BooleanType](BooleanParam){
        return GetChar(BooleanParam?2:1);
    }
}
const functionRead = {
    [ArrayType](tReader){
        let ArrayRet = [];
        let Ls =tReader.readByte();
        for (let index = 0; index < Ls; index++) {
            ArrayRet.push(Read(tReader.readByte(),tReader));
        }
        return ArrayRet;
    },
    [ObjectType](tReader){
        let ObjectRet = {};
        while (true) {
            let RType = tReader.readByte();
            if (RType == EndOfObject) {
                break;
            }
            let Key = "";
            let Value = {};
            try {
                Key = Read(StringType,tReader);
                Value = Read(RType,tReader);
                ObjectRet[Key] = Value;
            } catch (error) {
                console.log(`\n\n\nKey: ${Key}\n\n\n`);
                console.log('\n\n\n' + error,error.stack);
                break;
            }
        }
        return ObjectRet;
    },
    [StringType](tReader){
        return tReader.read(tReader.readByte());
    },
    [NumberType](tReader){
        let TextN = tReader.read(2);
        let charcode1 = 0x0000ffff & (TextN.charCodeAt(0) - 1);
        charcode1 |= 0xffff0000 & ((TextN.charCodeAt(1)<<16)-1);
        return Number(charcode1);
    },
    [FloatType](tReader){
        let TextN = tReader.read(4);
        let charcode1 = 0x0000ffff & (TextN.charCodeAt(0) - 1);
        charcode1 |= 0xffff0000 & ((TextN.charCodeAt(1)<<16)-1);
        let charcode2 = 0x0000ffff & (TextN.charCodeAt(2) - 1);
        charcode2 |= 0xffff0000 & ((TextN.charCodeAt(3)<<16)-1);
        return Number(charcode1 + '.' + charcode2);
    },
    [BooleanType](tReader){

        return Boolean(tReader.readByte()-1);
    }
}
function Write(value){
    let func = functionWrite[GetType(value)];
    return func(value);
}
function Read(Type,tReader){
    let func = functionRead[Type];
    return func(tReader);
}
export function decode(string) {
    if(string=="")
        return {};
    let NewT = new TextReader(string);
    return Read(NewT.readByte(),NewT);
}
export function code(object){
    let stringRet = "";
    if (Array.isArray(object)) {
        stringRet = GetChar(ArrayType);
        stringRet += functionWrite[ArrayType](object);
    }
    else{
        stringRet = GetChar(ObjectType);
        stringRet += functionWrite[ObjectType](object);
    }
    return stringRet;
}
function GetType(object){
    switch (typeof(object)) {
        case 'object':
            if (Array.isArray(object)) {
                return ArrayType;
            }
            return ObjectType;
        case 'number':
            return String(object).includes('.')?FloatType:NumberType;
        case 'boolean':
            return BooleanType;
        case 'string':
            return StringType;
        default:
            break;
    }
}
function GetChar(...number){
    return String.fromCharCode(...number);
}

export class NBT {
    static code(data){
        return code(data);
    }
    static decode(string){
        return decode(string);
    }
}
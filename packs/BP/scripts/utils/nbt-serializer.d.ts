type StringBase = 16|8|32;
type IStreamType = number | number | {buffer: ArrayBuffer};
class Stream extends DataView{
    constructor(buffer: ArrayBuffer | number, offset = 0)
    protected __offset__: number
    readonly offset: number
    readonly size: number
    readonly EndOfStream: boolean
    setOffset(num: number): void
    static fromString(text: string, options?: {bufferLength?: number, base?:StringBase},...params?: any): this
    /**@param {Stream} stream @param {8|16|32} base*/
    static toString(stream: Stream, base?: StringBase=16): string
    toString(base?: StringBase = 16): string
}
export class BinaryStreamWriter extends Stream{
    constructor(stream: IStreamType)
    writeBytes(buffer: ArrayBuffer,length=buffer.byteLength): number
    writeString(text: string, base: StringBase = 8): number
    writeByte(num: number): number
    writeUint8(num: number): number
    writeInt8(num: number): number
    writeInt16(num: number): number
    writeUint16(num: number): number
    writeInt32(num: number): number
    writeUint32(num: number): number
    writeFloat32(num: number): number
    writeFloat64(num: number): number
}
export class BinaryStreamReader extends Stream{
    constructor(stream: IStreamType)
    readBytes(length=0): Uint8Array
    readString(length=0, base = 8):string
    readByte():number
    readUint8():number
    readInt8():number
    readInt16():number
    readUint16():number
    readInt32():number
    readUint32():number
    readFloat32():number
    readFloat64():number
}
export class EndOfStreamError extends Error{}
export enum NBTTypes {
    "EndOfCompoud"=0,
    "Compoud"=1,
    "Array"=2,
    "TypedArray"=3,
    "Uint8"=4,
    "Uint16"=5,
    "Int32"=6,
    "Double"=7,
    "String"=8,
    "Empty"=9,
    "Boolean"=10
}
export class NBTStreamWriter extends BinaryStreamWriter{
    constructor(stream: IStreamType,options: object | NBTStreamWriter = new NBTWriterOptions())
    protected __options__: NBTWriterOptions;
    writeTypedArray<t>(array: Array<t>): number
    writeBoolean(bool: boolean):number
    writeString(text: string): number
    writeArray(array: any[]): number
    writeCompoud(object: object): number
    writeEmpty(): number
    writeType(type: NBTTypes): number
}
export class NBTStreamReader extends BinaryStreamReader{
    constructor(stream: IStreamType, options: object | NBTReaderOptions = new NBTReaderOptions())
    protected __options__: NBTReaderOptions;
    readTypedArray(): Array<any>
    readBoolean(): boolean
    readString(): string
    readArray(): any[]
    readCompoud(): object
    readEmpty(): undefined
    readType(): NBTTypes
}
export const NBT: {
    ReadNBT(stream: NBTStreamReader): any
    WriteNBT(data: any, stream: NBTStreamWriter, type?: NBTTypes): number
    getType(data: any): NBTTypes
    stringify(object:any, options?: NBTWriterOptions): string
    parse(string: string, options?: NBTReaderOptions): any
    createNewWriters<t extends Partial<typeof defaultWriters>>(object?: t): t & typeof defaultWriters
    createNewReaders<t extends Partial<typeof defualtReaders>>(object?: t): t & typeof defualtReaders
}
type WriterCall = (stream: NBTStreamWriter, data: any)=>number
type ReaderCall = (stream: NBTStreamReader)=>any
export const defaultWriters: {
    [NBTTypes.Compoud]:WriterCall,
    [NBTTypes.Empty]:WriterCall,
    [NBTTypes.Array]:WriterCall,
    [NBTTypes.String]:WriterCall,
    [NBTTypes.Boolean]:WriterCall,
    [NBTTypes.Uint8]:WriterCall,
    [NBTTypes.Uint16]:WriterCall,
    [NBTTypes.Int32]:WriterCall,
    [NBTTypes.Double]:WriterCall,
    [NBTTypes.TypedArray]:WriterCall
}
export const defualtReaders: {
    [NBTTypes.Compoud]:ReaderCall,
    [NBTTypes.Empty]:ReaderCall,
    [NBTTypes.Array]:ReaderCall,
    [NBTTypes.String]:ReaderCall,
    [NBTTypes.Boolean]:ReaderCall,
    [NBTTypes.Uint8]:ReaderCall,
    [NBTTypes.Uint16]:ReaderCall,
    [NBTTypes.Int32]:ReaderCall,
    [NBTTypes.Double]:ReaderCall,
    [NBTTypes.TypedArray]:ReaderCall
}
class NBTStreamOptions{
    nbtTypes: object & NBTTypes
    getType:(data: any)=>NBTStreamOptions["nbtTypes"][keyof NBTStreamOptions["nbtTypes"]]
}
export class NBTWriterOptions extends NBTStreamOptions{
    writers: ReturnType<typeof NBT["createNewWriters"]>;
}
export class NBTReaderOptions extends NBTStreamOptions{
    readers: ReturnType<typeof NBT["createNewReaders"]>;
}
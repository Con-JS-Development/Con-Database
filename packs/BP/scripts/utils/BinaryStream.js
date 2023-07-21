class Stream extends DataView{
    /**@param {ArrayBuffer|number} buffer*/
    constructor(buffer, offset = 0){
        if(typeof buffer === "number") super(new ArrayBuffer(buffer));
        else super(buffer);
        this.__offset__ = offset;
        this.__size__ = offset;
    }
    /**@private */
    __size__;
    /**@private */
    __off_set__;
    /**@protected */
    get __offset__(){return this.__off_set__??0;};
    set __offset__(v){if(v>this.byteLength) throw new EndOfStreamError("Offset cant be out of Stream."); this.__off_set__ = v; if(v>this.__size__) this.__size__ = v;}
    /**@readonly */
    get offset(){return this.__offset__;}
    get size(){return this.__size__;}
    /**@readonly */
    get EndOfStream(){return this.__offset__ >= this.byteLength;}
    setOffset(num){
        if(num>this.byteLength) throw new EndOfStreamError("Offset cant be out of Stream.");
    }
    static fromString(text, options,...params){
        const {bufferLength = 32e+3, base=16}=options??{};
        const BYTES_PER_ELEMENT = base / 8, property ="setUint" + base;
        if(text.length * BYTES_PER_ELEMENT > bufferLength) throw new RangeError("Can't fit text to specified buffer, please increase buffer length");
        const typedArray = new DataView(new ArrayBuffer(bufferLength));
        if(!property in typedArray) throw new Error("Invalid base: " + base);
        for (let i = 0; i < text.length; i++) typedArray[property](i*BYTES_PER_ELEMENT,String.prototype.charCodeAt.call(text,i) - 1);
        const a = new this(typedArray.buffer,...params);
        a.__size__ = text.length * BYTES_PER_ELEMENT;
        return a;
    }
    /**@param {Stream} stream @param {8|16|32} base*/
    static toString(stream, base=16){
        const BYTES_PER_ELEMENT = base / 8, property ="getUint" + base;
        const codes = [];
        if(!property in stream) throw new Error("Invalid base: " + base);
        for (let i = 0; i < stream.size; i+=BYTES_PER_ELEMENT) codes.push(1 + stream[property](i));
        return String.fromCharCode.apply(String,codes);
    }
    toString(base = 16){
        return Stream.toString(this,base);
    }
}
export class BinaryStreamWriter extends Stream{
    constructor(stream){
        if(typeof stream === "number") super(stream);
        else if(stream instanceof Stream) super(stream.buffer,stream.offset);
        else if("buffer" in stream) super(stream.buffer);
        else super(stream); 
    }
    writeBytes(buffer,length){
        const array = new Uint8Array(buffer);
        if(!length) length = array.length;
        for (var i = 0; i < length; i++) {
            this.writeByte(array[i]??0);
        }
        return i;
    }
    writeString(text, base = 8){
        const property = "writeUint" + base;
        if(!property in this) throw new Error("Invalid base: " + base);
        let out = 0;
        for (let i = 0; i < text.length; i++) out+= this[property](String.prototype.charCodeAt.call(text,i));
        return out;
    }
    /**@param {number} num */
    writeByte(num){return this.writeUint8(num);}
    /**@param {number} num */
    writeUint8(num){
        if(this.EndOfStream || this.__offset__ + 1 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        this.setUint8(this.__offset__,num);
        this.__offset__+=1;
        return 1;
    }
    /**@param {number} num */
    writeInt8(num){
        if(this.EndOfStream || this.__offset__ + 1 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        this.setInt8(this.__offset__,num);
        this.__offset__+=1;
        return 1;
    }

    /**@param {number} num */
    writeInt16(num){
        if(this.EndOfStream || this.__offset__ + 2 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        this.setInt16(this.__offset__,num);
        this.__offset__+=2;
        return 2;
    }    
    /**@param {number} num */
    writeUint16(num){
        if(this.EndOfStream || (this.__offset__ + 2 > this.byteLength)) throw new EndOfStreamError("You cant write at end of the stream");
        this.setUint16(this.__offset__,num);
        this.__offset__+=2;
        return 2;
    }

    /**@param {number} num */
    writeInt32(num){
        if(this.EndOfStream || this.__offset__ + 4 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        this.setInt32(this.__offset__,num);
        this.__offset__+=4;
        return 4;
    }    
    /**@param {number} num */
    writeUint32(num){
        if(this.EndOfStream || this.__offset__ + 4 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        this.setUint32(this.__offset__,num);
        this.__offset__+=4;
        return 4;
    }
    
    /**@param {number} num */
    writeFloat32(num){
        if(this.EndOfStream || this.__offset__ + 4 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        this.setFloat32(this.__offset__,num);
        this.__offset__+=4;
        return 4;
    }    
    /**@param {number} num */
    writeFloat64(num){
        if(this.EndOfStream || this.__offset__ + 8 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        this.setFloat64(this.__offset__,num);
        this.__offset__+=8;
        return 8;
    }
}
export class BinaryStreamReader extends Stream{
    constructor(stream){
        if(typeof stream === "number") super(stream);
        else if(stream instanceof Stream) super(stream.buffer,stream.offset);
        else if("buffer" in stream) super(stream.buffer);
        else super(stream); 
    }
    readBytes(length=0){
        if(length + this.offset > this.byteLength) length = this.byteLength - this.offset;
        const array = new Uint8Array(length);
        for (var i = 0; i < length; i++)  array[i] = this.readByte();
        return array;
    }
    readString(length=0, base = 8){
        const BYTES_PER_ELEMENT = base / 8, property = "readUint" + base;
        if((length*BYTES_PER_ELEMENT) + this.offset > this.byteLength) length = Math.floor((this.byteLength - this.offset)/BYTES_PER_ELEMENT);
        if(!property in this) throw new Error("Invalid base: " + base);
        let data = [];
        for (let i = 0; i < length; i++) data.push(this[property]());
        return String.fromCharCode.call(String,...data);
    }
    readByte(){return this.readUint8();}
    readUint8(){
        if(this.EndOfStream || this.__offset__ + 1 > this.byteLength) throw new EndOfStreamError("You cant read at end of the stream");
        const v = this.getUint8(this.__offset__);
        this.__offset__+=1;
        return v;
    }
    readInt8(){
        if(this.EndOfStream || this.__offset__ + 1 > this.byteLength) throw new EndOfStreamError("You cant write at end of the stream");
        const v = this.getInt8(this.__offset__);
        this.__offset__+=1;
        return v;
    }
    readInt16(){
        if(this.EndOfStream || this.__offset__ + 2 > this.byteLength) throw new EndOfStreamError("You cant read at end of the stream");
        const v = this.getInt16(this.__offset__);
        this.__offset__+=2;
        return v;
    }
    readUint16(){
        if(this.EndOfStream || this.__offset__ + 2 > this.byteLength) throw new EndOfStreamError("You cant read at end of the stream");
        const v = this.getUint16(this.__offset__);
        this.__offset__+=2;
        return v;
    }
    readInt32(){
        if(this.EndOfStream || this.__offset__ + 4 > this.byteLength) throw new EndOfStreamError("You cant read at end of the stream");
        const v = this.getInt32(this.__offset__);
        this.__offset__+=4;
        return v;
    }
    readUint32(){
        if(this.EndOfStream || this.__offset__ + 4 > this.byteLength) throw new EndOfStreamError("You cant read at end of the stream");
        const v = this.getUint32(this.__offset__);
        this.__offset__+=4;
        return v;
    }
    readFloat32(){
        if(this.EndOfStream || this.__offset__ + 4 > this.byteLength) throw new EndOfStreamError("You cant read at end of the stream");
        const v = this.getFloat32(this.__offset__);
        this.__offset__+=4;
        return v;
    }
    readFloat64(){
        if(this.EndOfStream || this.__offset__ + 8 > this.byteLength) throw new EndOfStreamError("You cant read at end of the stream");
        const v = this.getFloat64(this.__offset__);
        this.__offset__+=8;
        return v;
    }
}
export class EndOfStreamError extends Error{}

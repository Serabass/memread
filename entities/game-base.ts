import {Vehicle} from './vehicle';
import {Entity} from './entity';

const VEHICLES_ADDR = 0xA0FDE4;

export abstract class GameBase extends Entity {
    public process: any;

    public read(address: number, type: string) {
        switch (type) {
            case 'byte':
                return this.process.readMemory(address, 1).readInt8(0);
            case 'short':
                return this.process.readMemory(address, 2).readInt16BE(0); // OR LE
            case 'int':
                return this.process.readMemory(address, 4).readInt32BE(0); // OR LE
            case 'float':
                let test = this.process.readMemory(address, 4);
                return test.readFloatBE(0); // OR LE
            default:
                debugger;
        }
    }

    public readPointer(address: number, type: string) {
        let addr = this.read(address, 'int');
        return this.read(addr, type);
    }

    public write(address: number, type: string, value: any) {
        switch (type) {
            case 'byte':
                let byteMemBuffer: Buffer = new Buffer([]);
                byteMemBuffer.writeInt8(value, 0);
                return this.process.writeMemory(address, byteMemBuffer);
            case 'short':
                let shortMemBuffer: Buffer = new Buffer([]);
                shortMemBuffer.writeInt16BE(value, 0);
                return this.process.writeMemory(address, shortMemBuffer);
            case 'int':
                let intMemBuffer: Buffer = new Buffer([]);
                intMemBuffer.writeInt16BE(value, 0);
                return this.process.writeMemory(address, intMemBuffer);
            default:
                debugger;
        }
    }

    public get vehicles(): Vehicle[] {
        let result: Vehicle[] = [];
        let addr = VEHICLES_ADDR;
        let entity = this.read(addr, 'int');

        while (entity !== 0) {
            result.push(new Vehicle(entity));
            addr += 4;
            entity = this.readPointer(addr, 'int');
        }

        return result;
    }
}

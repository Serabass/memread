import 'reflect-metadata';
import {MemoryArrayPointer, MemoryPointer} from '../../pointer';

export default function Prop(offset: number, type: any = null): PropertyDecorator {
    return (target: any, propKey: string): any => {
        let props = Reflect.getMetadata('props', target);
        let k = Reflect.getMetadataKeys(target);
        let k2 = Reflect.getMetadataKeys(target, 'props');

        if (!props) {
            props = {};
        }

        props[propKey] = {offset, type};
        Reflect.defineMetadata('props', props, target);
    };
}

Prop.int = function(offset: number) {
    return Prop(offset, 'int');
};

Prop.float = function(offset: number) {
    return Prop(offset, 'float');
};

Prop.byte = function(offset: number) {
    return Prop(offset, 'int');
};

Prop.short = function(offset: number) {
    return Prop(offset, 'short');
};

Prop.bool = function(offset: number) {
    return Prop(offset, 'bool');
};

Prop.array = function(offset: number, Type: any) {
    return Prop(offset, MemoryArrayPointer.of(Type));
};

Prop.pointer = function(offset: number, Type: any) {
    return Prop(offset, MemoryPointer.from(Type));
};

Prop.define = function(type: any = null) {
    return (target: any, propKey: string): any => {
        debugger;
    };
};

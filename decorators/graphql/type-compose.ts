import {GraphQLList} from 'graphql';
import {TypeComposer} from 'graphql-compose';
import 'reflect-metadata';
import {MemoryArrayPointer, MemoryPointer} from '../../pointer';

function getGQLTypeOf(type) {
    switch (typeof type) {
        case 'string':
            switch (type) {
                case 'float':
                    return 'Float';
                case 'byte':
                case 'int':
                case 'short':
                    return 'Int';
                case 'bool':
                    return 'Boolean';
                default:
                    debugger;
            }
            break;
        case 'function':
            return type.name;
        case 'object':
            if (type instanceof MemoryPointer) {
                return (type.cls as any).name;
            } else if (type instanceof MemoryArrayPointer) {
                return `[${(type.cls as any).name}]`;
            }
            break;
        default:
            debugger;
    }
}

export default function TypeCompose(name?: string): ClassDecorator {
    return (target: any) => {
        if (!name) {
            name = target.name;
        }

        let props = Reflect.getMetadata('props', target.prototype);

        if (!props) {
            props = {};
        }

        let tc = TypeComposer.create(name);

        Object.keys(props).forEach((key) => {
            let prop = props[key];
            tc.addFields({
                [key]: {
                    type: getGQLTypeOf(prop.type),
                    resolve: (res) => res[key],
                },
            });

        });

        if (!props) {
            return;
        }

        /*
                let MemoryType = Prop.define(type)(target, propKey);
                let attributes: PropertyDescriptor = {
                    get: function() {
                        let address = this.baseAddress + offset;

                        switch (typeof MemoryType) {
                            case 'function':
                                return new MemoryType(address);
                            case 'object':
                                if (MemoryType instanceof MemoryPointer) {
                                    let value = Game.instance.read(address, 'int');
                                    return new (MemoryType.cls as any)(value);
                                } else if (MemoryType instanceof MemoryArrayPointer) {
                                    let result = [];
                                    let value;
                                    value = Game.instance.read(address, 'int');

                                    while (value != 0) {
                                        result.push(new (MemoryType.cls as any)(value));
                                        address += 4;
                                        value = Game.instance.read(address, 'int');
                                    }

                                    return result;
                                } else {
                                    debugger;
                                }
                                throw new Error('1232312312');
                            case 'string':
                                return Game.instance.read(address, MemoryType);

                        }

                        throw new Error('5555555555555');
                    },
                    enumerable: true,
                };

                if (typeof MemoryType == 'string') {
                    attributes.set = function(value) {
                        let address = this.baseAddress + offset;
                        Game.instance.write(address, MemoryType, value);
                    }
                }

                Object.defineProperty(target, propKey, attributes);*/
    };
}

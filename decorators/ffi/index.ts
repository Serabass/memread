import 'reflect-metadata';

import * as ffi from 'ffi';
import * as struct from 'ref-struct';

export interface IFFIOptions {
    name?: string;
    returnValue: string;
    propertyKey?: string;
    params: string[];
    async?: boolean;
    unicode?: boolean;
}

let KEYS = {
    CLASS_METHODS: 'class:methods',
    STRUCT_FIELDS: 'struct:fields',
};

function prepareUnicodeArgs(defs, ...args) {
    return args.map((arg, i) => {
        if (defs[i] === 'string') {
            return Buffer.from(args[i], 'ucs2');
        }

        return arg;
    });
}

export class Struct {
    public static define() {
        return (target) => {
            let data = Reflect.getMetadata(KEYS.STRUCT_FIELDS, target.prototype);
            let props = struct({});

            for (let entry of data) {
                let key = entry.name || entry.propertyKey;
                props.defineProperty(key, entry.type);
                // props[entry.name || entry.propertyKey] = entry.type;
            }
            target.struct = props;
        };
    }

    public static field(type: string, name?: string) {
        return (target, propertyKey: string) => {
            let data = Reflect.getMetadata(KEYS.STRUCT_FIELDS, target);

            if (!data) {
                data = [];
            }

            if (!name) {
                name = propertyKey;
            }

            data.push({
                name, type, propertyKey,
            });

            Reflect.defineMetadata(KEYS.STRUCT_FIELDS, data, target);
        };
    }
}

export function Library(libName: string): any {
    return (target) => {
        let methods: IFFIOptions[] = Reflect.getMetadata(KEYS.CLASS_METHODS, target);
        let definitions = {};
        let lib;

        for (let method of methods) {
            definitions[method.name] = [
                method.returnValue,
                method.params,
            ];

            let methodImplementation;
            if (method.async) {
                methodImplementation = (...args) => new Promise((resolve, reject) => {
                    lib[method.name].async(...args, function(err, res) {
                        if (method.unicode) {
                            args = prepareUnicodeArgs(method.params, ...args);
                        }

                        if (err) {
                            return reject(err);
                        }

                        resolve(res);
                    });
                });
            } else {
                methodImplementation = (...args) => {
                    if (method.unicode) {
                        args = prepareUnicodeArgs(method.params, ...args);
                    }

                    return lib[method.name](...args);
                };
            }
            Object.defineProperty(target, method.propertyKey, {
                value: methodImplementation,
                writable: false,
            });
        }

        lib = ffi.Library(libName, definitions);
    };
}

export function Method(options: IFFIOptions): any {
    options.returnValue = 'void';
    return Func(options);
}

export function Func(options: IFFIOptions): any {
    return (target, propertyKey: string | symbol, init) => {
        let methods = Reflect.getMetadata(KEYS.CLASS_METHODS, target);

        if (!methods) {
            methods = [];
        }

        if (!options.name) {
            options.name = propertyKey as string;
        }

        if (!options.unicode) {
            options.unicode = false;
        }

        options.propertyKey = propertyKey as string;

        methods.push(options);

        Reflect.defineMetadata(KEYS.CLASS_METHODS, methods, target);
    };
}

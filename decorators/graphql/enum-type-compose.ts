import 'reflect-metadata';
import {EnumTypeComposer} from 'graphql-compose';

const VALUES = 'values';

export function EnumTypeCompose(target) {
    let values = {};
    Object.keys(target).forEach((key) => {
        let value = target[key];
        values[key] = { value };
    });
    EnumTypeComposer.create({
        name: target.name,
        values,
    });
}

export function Field(target, propertyKey: string) {
    let values = Reflect.getMetadata(VALUES, target);

    if (!values) {
        values = {};
    }

    values[propertyKey] = {
        value: target[propertyKey],
    };

    Reflect.defineMetadata(VALUES, values, target);
}

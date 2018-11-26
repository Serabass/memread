import {EnumTypeCompose, Field} from '../decorators/graphql/enum-type-compose';

@EnumTypeCompose
export default class ModelIndex {
    public static NULL = 0;
    public static COP = 1;
    public static SW = 2;
}

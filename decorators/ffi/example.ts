import {Library, Struct, Func} from '../ffi';

@Struct.define()
export class MyStruct {
    @Struct.field('int')
    public field: number;

    @Struct.field('float')
    public field2: number;
}

@Library('user32')
export class User32 {
    @Func({
        name: 'MessageBoxW',
        returnValue: 'int',
        params: ['int', 'string', 'string', 'int'],
        unicode: true,
    })
    public static MessageBox: (hWnd: number, text: string, title: string, type: number) => number;

    @Func({
        async: true,
        name: 'MessageBoxW',
        returnValue: 'int',
        params: ['int', 'string', 'string', 'int'],
    })
    public static MessageBoxAsync: (hWnd: number, text: string, title: string, type: number) => Promise<number>;

    @Func({
        async: true,
        name: 'FindWindowW',
        returnValue: 'int',
        params: ['string', 'string'],
        unicode: true,
    })
    public static FindWindowAsync: (className: string, title: string) => Promise<number>;
}

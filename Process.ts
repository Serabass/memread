import {FFI} from './decorators/ffi';

/**
 * TODO Define methods:
 *  - OpenProcess
 *  - VirtualAllocEx
 *  - CreateRemoteThread
 *  - CreateToolhelp32Snapshot
 *  - Process32First
 *  - Process32Next
 *  - CloseHandle
 *  - WaitForSingleObject
 *  - VirtualFreeEx
 */

@FFI.Library('kernel32')
export class Kernel32 {
    @FFI.Function({
        returnValue: 'int',
        params: [
            'int',      // hProcess
            'int',      // lpBaseAddress
            'void *',   // lpBuffer
            'int',      // nSize
            'int',      // *lpNumberOfBytesRead
        ],
    })
    public static ReadProcessMemory: (hProcess: number, lpBaseAddress: number, lpBuffer: Buffer,
                                      nSize: number, lpNumberOfBytesRead: Buffer) => number;
}

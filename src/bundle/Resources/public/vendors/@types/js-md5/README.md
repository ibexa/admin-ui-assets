# Installation
> `npm install --save @types/js-md5`

# Summary
This package contains type definitions for js-md5 (https://github.com/emn178/js-md5).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/js-md5.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/js-md5/index.d.ts)
````ts
declare namespace md5 {
    type message = string | any[] | Uint8Array | ArrayBuffer;

    interface Md5 {
        array(): number[];
        arrayBuffer(): ArrayBuffer;
        buffer(): ArrayBuffer;
        digest(): number[];
        hex(): string;
        toString(): string;
        update(message: message): Md5;
        base64(): string;
    }

    interface md5 {
        (message: message): string;
        hex(message: message): string;
        array(message: message): number[];
        digest(message: message): number[];
        arrayBuffer(message: message): ArrayBuffer;
        buffer(message: message): ArrayBuffer;
        create(): Md5;
        update(message: message): Md5;
        base64(message: message): string;
    }
}

declare const md5: md5.md5;
export = md5;

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 03:09:37 GMT
 * Dependencies: none

# Credits
These definitions were written by [Michael McCarthy](https://github.com/mwmccarthy).

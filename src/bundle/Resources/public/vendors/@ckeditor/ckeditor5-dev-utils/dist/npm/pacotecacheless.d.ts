/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md.
*/
import pacote from "pacote";
type CacheLessPacoteMethod<T extends (...args: Array<any>) => any> = (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>;
export declare const manifest: CacheLessPacoteMethod<typeof pacote.manifest>;
export declare const packument: CacheLessPacoteMethod<typeof pacote.packument>;
export {};

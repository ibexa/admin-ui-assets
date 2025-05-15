/*
 *             Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 *
 *
 *
 *
 *          +---------------------------------------------------------------------------------+
 *          |                                                                                 |
 *          |                                 Hello stranger!                                 |
 *          |                                                                                 |
 *          |                                                                                 |
 *          |   What you're currently looking at is the source code of a legally protected,   |
 *          |    proprietary software. Any attempts to deobfuscate / disassemble this code    |
 *          |               are forbidden and will result in legal consequences.              |
 *          |                                                                                 |
 *          |                                                                                 |
 *          +---------------------------------------------------------------------------------+
 *
 *
 *
 *
 */
const IS_NODE=/* #__PURE__ -- @preserve */
((()=>!('undefined'==typeof process||!process['versions']?.['node']))());export const MessageDataTypes={'BUFFER':0x1,'STRING':0x2,'NUMBER':0x3,'OBJECT':0x4};export default class ParserUtils{static['getPacketType'](..._0x25d4cd){let _0x542ea7=0x0;for(let _0x383eea=0x0;_0x383eea<_0x25d4cd['length'];_0x383eea++){_0x542ea7+=_0x25d4cd[_0x383eea]*Math['pow'](0xa,_0x25d4cd['length']-_0x383eea-0x1);}return _0x542ea7;}static['getType'](_0x5f0b2a){if(ParserUtils['isBuffer'](_0x5f0b2a))return MessageDataTypes['BUFFER'];const _0x5ecb3a=typeof _0x5f0b2a;return'string'===_0x5ecb3a?MessageDataTypes['STRING']:'number'===_0x5ecb3a?MessageDataTypes['NUMBER']:MessageDataTypes['OBJECT'];}static['isBuffer'](_0x4562a1){return IS_NODE&&Buffer['isBuffer'](_0x4562a1)||_0x4562a1 instanceof ArrayBuffer||_0x4562a1 instanceof Uint8Array||this['_isBufferView'](_0x4562a1);}static['_isBufferView'](_0x2df455){return'function'==typeof ArrayBuffer['isView']?ArrayBuffer['isView'](_0x2df455):_0x2df455['buffer']instanceof ArrayBuffer;}}
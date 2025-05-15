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
import{Decoder as _0x1cb4e7,Encoder as _0x413938,PacketType}from'socket.io-parser';import _0x578021 from'./packetparser.js';import _0x5cd308 from'./parserutils.js';export const ENCODED_TYPES=/* #__PURE__ -- @preserve */
((()=>[PacketType['EVENT'],PacketType['ACK'],PacketType['BINARY_ACK'],PacketType['BINARY_EVENT']])());export class Encoder extends _0x413938{['_packetParser'];constructor(_0x2db067){super(),this['_packetParser']=_0x2db067??new _0x578021();}['encode'](_0xa8e4a4){if(ENCODED_TYPES['includes'](_0xa8e4a4['type']))try{return[this['_packetParser']['encode'](_0xa8e4a4['type'],_0xa8e4a4['data'],_0xa8e4a4['id'],_0xa8e4a4['nsp'])];}catch(_0x50b73a){console['error']('Can\x20not\x20properly\x20serialize\x20or\x20deserialize\x20messages.\x20Check\x20the\x20original\x20error.',{'originalError':{'message':_0x50b73a['message']}});}return super['encode'](_0xa8e4a4);}}export class Decoder extends _0x1cb4e7{['_packetParser'];constructor(_0xd232f5){super(),this['_packetParser']=_0xd232f5??new _0x578021();}['add'](_0x2f9843){if(!_0x5cd308['isBuffer'](_0x2f9843))return super['add'](_0x2f9843);let _0x439774;try{_0x439774=this['_packetParser']['decode'](_0x2f9843)['packet'];}catch(_0x391078){return super['add'](_0x2f9843);}super['emitReserved']('decoded',_0x439774);}}
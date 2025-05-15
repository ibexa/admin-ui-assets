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
import _0x39ea57 from'./packagedatamessage.js';import _0x1c0852,{MessageDataTypes}from'./../parserutils.js';export default class StringBytesPacketDataMessage extends _0x39ea57{['data'];['data1'];static ['TYPE']=/* #__PURE__ -- @preserve */
((()=>_0x1c0852['getPacketType'](MessageDataTypes['STRING'],MessageDataTypes['BUFFER']))());static ['DESCRIPTOR_NAME']='StringBytesPacketDataMessage';static ['DESCRIPTOR']={'fields':{'data':{'type':'string','id':0x1},'data1':{'type':'bytes','id':0x2}}};constructor(_0x447f11,_0x25d0b5){super(),this['data']=_0x447f11,this['data1']=_0x25d0b5;}['toJSON'](){return{'data':this['data'],'data1':this['data1']};}static['fromJSON'](_0x371e65){return new StringBytesPacketDataMessage(_0x371e65['data'],_0x371e65['data1']);}static['create'](_0x3a4f6c,_0x4bb951){return new StringBytesPacketDataMessage(_0x3a4f6c,_0x4bb951);}}
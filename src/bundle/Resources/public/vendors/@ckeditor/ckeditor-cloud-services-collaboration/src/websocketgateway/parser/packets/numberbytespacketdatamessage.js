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
import _0x1a5b5b from'./packagedatamessage.js';import _0xdf45ae,{MessageDataTypes}from'./../parserutils.js';export default class NumberBytesPacketDataMessage extends _0x1a5b5b{['data'];['data1'];static ['TYPE']=/* #__PURE__ -- @preserve */
((()=>_0xdf45ae['getPacketType'](MessageDataTypes['NUMBER'],MessageDataTypes['BUFFER']))());static ['DESCRIPTOR_NAME']='NumberBytesPacketDataMessage';static ['DESCRIPTOR']={'fields':{'data':{'type':'uint32','id':0x1},'data1':{'type':'bytes','id':0x2}}};constructor(_0x26b750,_0xf98a87){super(),this['data']=_0x26b750,this['data1']=_0xf98a87;}['toJSON'](){return{'data':this['data'],'data1':this['data1']};}static['fromJSON'](_0x205357){return new NumberBytesPacketDataMessage(_0x205357['data'],_0x205357['data1']);}static['create'](_0x4a25f4,_0x3fc278){return new NumberBytesPacketDataMessage(_0x4a25f4,_0x3fc278);}}
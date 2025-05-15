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
import _0x41e671 from'./packagedatamessage.js';import _0x358d00,{MessageDataTypes}from'./../parserutils.js';export default class NumberNumberPacketDataMessage extends _0x41e671{['data'];['data1'];static ['TYPE']=/* #__PURE__ -- @preserve */
((()=>_0x358d00['getPacketType'](MessageDataTypes['NUMBER'],MessageDataTypes['NUMBER']))());static ['DESCRIPTOR_NAME']='NumberNumberPacketDataMessage';static ['DESCRIPTOR']={'fields':{'data':{'type':'uint32','id':0x1},'data1':{'type':'uint32','id':0x2}}};constructor(_0x4b9d34,_0x2f6de2){super(),this['data']=_0x4b9d34,this['data1']=_0x2f6de2;}['toJSON'](){return{'data':this['data'],'data1':this['data1']};}static['fromJSON'](_0x489566){return new NumberNumberPacketDataMessage(_0x489566['data'],_0x489566['data1']);}static['create'](_0xa21f36,_0x231751){return new NumberNumberPacketDataMessage(_0xa21f36,_0x231751);}}
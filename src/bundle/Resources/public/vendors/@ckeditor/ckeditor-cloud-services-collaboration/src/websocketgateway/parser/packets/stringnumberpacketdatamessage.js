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
import _0x1ebc51 from'./packagedatamessage.js';import _0x3fb8bf,{MessageDataTypes}from'./../parserutils.js';export default class StringNumberPacketDataMessage extends _0x1ebc51{['data'];['data1'];static ['TYPE']=/* #__PURE__ -- @preserve */
((()=>_0x3fb8bf['getPacketType'](MessageDataTypes['STRING'],MessageDataTypes['NUMBER']))());static ['DESCRIPTOR_NAME']='StringNumberPacketDataMessage';static ['DESCRIPTOR']={'fields':{'data':{'type':'string','id':0x1},'data1':{'type':'uint32','id':0x2}}};constructor(_0x1266c0,_0x1d529c){super(),this['data']=_0x1266c0,this['data1']=_0x1d529c;}['toJSON'](){return{'data':this['data'],'data1':this['data1']};}static['fromJSON'](_0x123e50){return new StringNumberPacketDataMessage(_0x123e50['data'],_0x123e50['data1']);}static['create'](_0x55af69,_0x2718de){return new StringNumberPacketDataMessage(_0x55af69,_0x2718de);}}
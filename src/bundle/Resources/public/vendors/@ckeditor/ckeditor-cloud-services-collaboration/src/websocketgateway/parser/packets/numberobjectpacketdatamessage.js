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
import _0x531f48 from'./packagedatamessage.js';import _0x10a66f,{MessageDataTypes}from'./../parserutils.js';export default class NumberObjectPacketDataMessage extends _0x531f48{['data'];['data1'];static ['TYPE']=/* #__PURE__ -- @preserve */
((()=>_0x10a66f['getPacketType'](MessageDataTypes['NUMBER'],MessageDataTypes['OBJECT']))());static ['DESCRIPTOR_NAME']='NumberObjectPacketDataMessage';static ['DESCRIPTOR']={'fields':{'data':{'type':'uint32','id':0x1},'data1':{'type':'string','id':0x2}}};constructor(_0x50c73c,_0x170f08){super(),this['data']=_0x50c73c,this['data1']=_0x170f08;}['toJSON'](){return{'data':this['data'],'data1':this['data1']?JSON['stringify'](this['data1']):void 0x0};}static['fromJSON'](_0x34a7d4){return new NumberObjectPacketDataMessage(_0x34a7d4['data'],_0x34a7d4['data1']&&JSON['parse'](_0x34a7d4['data1']));}static['create'](_0x535240,_0x119705){return new NumberObjectPacketDataMessage(_0x535240,_0x119705);}}
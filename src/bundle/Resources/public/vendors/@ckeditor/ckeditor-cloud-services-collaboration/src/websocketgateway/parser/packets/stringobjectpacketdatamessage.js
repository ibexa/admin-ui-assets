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
import _0x24528e from'./packagedatamessage.js';import _0x107342,{MessageDataTypes}from'./../parserutils.js';export default class StringObjectPacketDataMessage extends _0x24528e{['data'];['data1'];static ['TYPE']=/* #__PURE__ -- @preserve */
((()=>_0x107342['getPacketType'](MessageDataTypes['STRING'],MessageDataTypes['OBJECT']))());static ['DESCRIPTOR_NAME']='StringObjectPacketDataMessage';static ['DESCRIPTOR']={'fields':{'data':{'type':'string','id':0x1},'data1':{'type':'string','id':0x2}}};constructor(_0x23a642,_0xfee91c){super(),this['data']=_0x23a642,this['data1']=_0xfee91c;}['toJSON'](){return{'data':this['data'],'data1':this['data1']?JSON['stringify'](this['data1']):void 0x0};}static['fromJSON'](_0x2626cb){return new StringObjectPacketDataMessage(_0x2626cb['data'],_0x2626cb['data1']&&JSON['parse'](_0x2626cb['data1']));}static['create'](_0x1eed74,_0x46c1f8){return new StringObjectPacketDataMessage(_0x1eed74,_0x46c1f8);}}
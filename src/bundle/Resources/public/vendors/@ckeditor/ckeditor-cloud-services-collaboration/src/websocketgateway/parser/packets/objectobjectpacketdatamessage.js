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
import _0xaeb8ff from'./packagedatamessage.js';import _0x3a1018,{MessageDataTypes}from'./../parserutils.js';export default class ObjectObjectPacketDataMessage extends _0xaeb8ff{['data'];['data1'];static ['TYPE']=/* #__PURE__ -- @preserve */
((()=>_0x3a1018['getPacketType'](MessageDataTypes['OBJECT'],MessageDataTypes['OBJECT']))());static ['DESCRIPTOR_NAME']='ObjectObjectPacketDataMessage';static ['DESCRIPTOR']={'fields':{'data':{'type':'string','id':0x1},'data1':{'type':'string','id':0x2}}};constructor(_0x154177,_0x2bda31){super(),this['data']=_0x154177,this['data1']=_0x2bda31;}['toJSON'](){return{'data':this['data']?JSON['stringify'](this['data']):void 0x0,'data1':this['data1']?JSON['stringify'](this['data1']):void 0x0};}static['fromJSON'](_0x451be2){return new ObjectObjectPacketDataMessage(_0x451be2['data']&&JSON['parse'](_0x451be2['data']),_0x451be2['data1']&&JSON['parse'](_0x451be2['data1']));}static['create'](_0x45afa8,_0xd3d956){return new ObjectObjectPacketDataMessage(_0x45afa8,_0xd3d956);}}
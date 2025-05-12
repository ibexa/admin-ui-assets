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
import _0x5e1729 from'./packagedatamessage.js';import _0x3b0ec7,{MessageDataTypes}from'./../parserutils.js';export default class NumberStringPacketDataMessage extends _0x5e1729{['data'];['data1'];static ['TYPE']=/* #__PURE__ -- @preserve */
((()=>_0x3b0ec7['getPacketType'](MessageDataTypes['NUMBER'],MessageDataTypes['STRING']))());static ['DESCRIPTOR_NAME']='NumberStringPacketDataMessage';static ['DESCRIPTOR']={'fields':{'data':{'type':'uint32','id':0x1},'data1':{'type':'string','id':0x2}}};constructor(_0xce7b9,_0x36fc9d){super(),this['data']=_0xce7b9,this['data1']=_0x36fc9d;}['toJSON'](){return{'data':this['data'],'data1':this['data1']};}static['fromJSON'](_0x188e58){return new NumberStringPacketDataMessage(_0x188e58['data'],_0x188e58['data1']);}static['create'](_0x210d93,_0x17a743){return new NumberStringPacketDataMessage(_0x210d93,_0x17a743);}}
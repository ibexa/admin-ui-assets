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
import _0x287628 from'./packagedatamessage.js';import _0x5a64bd,{MessageDataTypes}from'./../parserutils.js';export default class StringStringPacketDataMessage extends _0x287628{['data'];['data1'];static ['TYPE']=/* #__PURE__ -- @preserve */
((()=>_0x5a64bd['getPacketType'](MessageDataTypes['STRING'],MessageDataTypes['STRING']))());static ['DESCRIPTOR_NAME']='StringStringPacketDataMessage';static ['DESCRIPTOR']={'fields':{'data':{'type':'string','id':0x1},'data1':{'type':'string','id':0x2}}};constructor(_0xd7b27c,_0x201f04){super(),this['data']=_0xd7b27c,this['data1']=_0x201f04;}['toJSON'](){return{'data':this['data'],'data1':this['data1']};}static['fromJSON'](_0x47a2f6){return new StringStringPacketDataMessage(_0x47a2f6['data'],_0x47a2f6['data1']);}static['create'](_0x1efb80,_0xbaaf03){return new StringStringPacketDataMessage(_0x1efb80,_0xbaaf03);}}
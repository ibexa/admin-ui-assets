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
import _0x4e9e47 from'./packagedatamessage.js';import _0x346720,{MessageDataTypes}from'./../parserutils.js';export default class BytesBytesPacketDataMessage extends _0x4e9e47{['data'];['data1'];static ['TYPE']=/* #__PURE__ -- @preserve */
((()=>_0x346720['getPacketType'](MessageDataTypes['BUFFER'],MessageDataTypes['BUFFER']))());static ['DESCRIPTOR_NAME']='BytesBytesPacketDataMessage';static ['DESCRIPTOR']={'fields':{'data':{'type':'bytes','id':0x1},'data1':{'type':'bytes','id':0x2}}};constructor(_0x1c4b3a,_0x32ec32){super(),this['data']=_0x1c4b3a,this['data1']=_0x32ec32;}['toJSON'](){return{'data':this['data'],'data1':this['data1']};}static['fromJSON'](_0x3afb2b){return new BytesBytesPacketDataMessage(_0x3afb2b['data'],_0x3afb2b['data1']);}static['create'](_0x2d5667,_0x386f94){return new BytesBytesPacketDataMessage(_0x2d5667,_0x386f94);}}
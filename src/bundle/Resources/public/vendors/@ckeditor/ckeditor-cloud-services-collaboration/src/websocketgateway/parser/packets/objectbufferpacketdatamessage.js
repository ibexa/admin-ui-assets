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
import _0x27d14c from'./packagedatamessage.js';import _0x4d048c,{MessageDataTypes}from'./../parserutils.js';export default class ObjectBufferPacketDataMessage extends _0x27d14c{['data'];['data1'];static ['TYPE']=/* #__PURE__ -- @preserve */
((()=>_0x4d048c['getPacketType'](MessageDataTypes['OBJECT'],MessageDataTypes['BUFFER']))());static ['DESCRIPTOR_NAME']='ObjectBufferPacketDataMessage';static ['DESCRIPTOR']={'fields':{'data':{'type':'string','id':0x1},'data1':{'type':'bytes','id':0x2}}};constructor(_0x173332,_0x2156fb){super(),this['data']=_0x173332,this['data1']=_0x2156fb;}['toJSON'](){return{'data':this['data']?JSON['stringify'](this['data']):void 0x0,'data1':this['data1']};}static['fromJSON'](_0x5df2ee){return new ObjectBufferPacketDataMessage(_0x5df2ee['data']&&JSON['parse'](_0x5df2ee['data']),_0x5df2ee['data1']);}static['create'](_0x300353,_0x23f4a1){return new ObjectBufferPacketDataMessage(_0x300353,_0x23f4a1);}}
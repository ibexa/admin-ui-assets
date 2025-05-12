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
import _0x132d36 from'./../../message.js';export default class ChannelMessage extends _0x132d36{['type'];['socketId'];['data'];static ['DESCRIPTOR_NAME']='ChannelMessage';static ['DESCRIPTOR']={'fields':{'type':{'type':'uint32','id':0x1},'socketId':{'type':'string','id':0x2},'data':{'type':'bytes','id':0x3}}};constructor(_0x2ed97f,_0x308802,_0x475dea){super(),this['type']=_0x2ed97f,this['socketId']=_0x308802,this['data']=_0x475dea;}['toJSON'](){return{'type':this['type'],'socketId':this['socketId'],'data':this['data']};}static['fromJSON'](_0x1fdda8){return new ChannelMessage(_0x1fdda8['type'],_0x1fdda8['socketId'],_0x1fdda8['data']);}}
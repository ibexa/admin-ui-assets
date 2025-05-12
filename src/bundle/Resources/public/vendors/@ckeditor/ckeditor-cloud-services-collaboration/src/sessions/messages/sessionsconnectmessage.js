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
import _0x1ae5e6 from'./../../message.js';export default class SessionsConnectMessage extends _0x1ae5e6{['id'];['sessionType'];static ['TYPE']='31';static ['READABLE_TYPE_NAME']='getConnectedSockets';static ['DESCRIPTOR_NAME']='SessionsConnectMessage';static ['DESCRIPTOR']={'fields':{'id':{'type':'string','id':0x1},'sessionType':{'type':'uint32','id':0x2}}};constructor(_0x5ec205,_0xc7bb7b){super(),this['id']=_0x5ec205,this['sessionType']=_0xc7bb7b;}['toJSON'](){return{'id':this['id'],'sessionType':this['sessionType']};}static['fromJSON'](_0x18540c){return new SessionsConnectMessage(_0x18540c['id'],_0x18540c['sessionType']);}}
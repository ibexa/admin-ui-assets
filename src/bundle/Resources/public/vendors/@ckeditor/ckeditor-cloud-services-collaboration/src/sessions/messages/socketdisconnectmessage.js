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
import _0x322df7 from'./../../message.js';export default class SocketDisconnectMessage extends _0x322df7{['id'];static ['TYPE']='33';static ['READABLE_TYPE_NAME']='disconnectSocket';static ['DESCRIPTOR_NAME']='SocketDisconnectMessage';static ['DESCRIPTOR']={'fields':{'id':{'type':'string','id':0x1}}};constructor(_0xcf87cb){super(),this['id']=_0xcf87cb;}['toJSON'](){return{'id':this['id']};}static['fromJSON'](_0x1b4553){return new SocketDisconnectMessage(_0x1b4553['id']);}}
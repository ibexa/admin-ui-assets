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
import _0x3153d8 from'./../../message.js';export default class ConnectMessage extends _0x3153d8{['documentId'];static ['TYPE']='92';static ['READABLE_TYPE_NAME']='connectToComment';static ['DESCRIPTOR_NAME']='CommentsV2ConnectMessage';static ['DESCRIPTOR']={'fields':{'documentId':{'type':'string','id':0x1}}};constructor(_0x2d0ade){super(),this['documentId']=_0x2d0ade;}['toJSON'](){return{'documentId':this['documentId']};}static['fromJSON'](_0x34b660){return new ConnectMessage(_0x34b660['documentId']);}}
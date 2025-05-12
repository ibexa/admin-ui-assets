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
import _0x25aff8 from'./../../message.js';export default class RevisionHistoryConnectMessage extends _0x25aff8{['documentId'];static ['TYPE']='121';static ['READABLE_TYPE_NAME']='connectToRevisionHistory';static ['DESCRIPTOR_NAME']='RevisionHistoryConnectMessage';static ['DESCRIPTOR']={'fields':{'documentId':{'type':'string','id':0x1}}};constructor(_0x441eb4){super(),this['documentId']=_0x441eb4;}['toJSON'](){return{'documentId':this['documentId']};}static['fromJSON'](_0x5961c2){return new RevisionHistoryConnectMessage(_0x5961c2['documentId']);}}
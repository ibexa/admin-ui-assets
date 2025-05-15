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
import _0xd59a88 from'./../../message.js';export default class ConnectMessage extends _0xd59a88{['documentId'];static ['TYPE']='105';static ['READABLE_TYPE_NAME']='connectToSuggestions';static ['DESCRIPTOR_NAME']='TrackChangesConnectMessage';static ['DESCRIPTOR']={'fields':{'documentId':{'type':'string','id':0x1}}};constructor(_0x2f8557){super(),this['documentId']=_0x2f8557;}['toJSON'](){return{'documentId':this['documentId']};}static['fromJSON'](_0x2b5017){return new ConnectMessage(_0x2b5017['documentId']);}}
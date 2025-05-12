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
import _0xcd1587 from'./../../message.js';export default class RevisionHistoryReconnectMessage extends _0xcd1587{['documentId'];['requestId'];static ['TYPE']='122';static ['READABLE_TYPE_NAME']='reconnectToRevisionHistory';static ['DESCRIPTOR_NAME']='RevisionHistoryReconnectMessage';static ['DESCRIPTOR']={'fields':{'documentId':{'type':'string','id':0x1},'requestId':{'type':'uint32','id':0x2}}};constructor(_0x5e67c0,_0x178ade){super(),this['documentId']=_0x5e67c0,this['requestId']=_0x178ade;}['toJSON'](){return{'documentId':this['documentId'],'requestId':this['requestId']};}static['fromJSON'](_0x218cb2){return new RevisionHistoryReconnectMessage(_0x218cb2['documentId'],_0x218cb2['requestId']);}}
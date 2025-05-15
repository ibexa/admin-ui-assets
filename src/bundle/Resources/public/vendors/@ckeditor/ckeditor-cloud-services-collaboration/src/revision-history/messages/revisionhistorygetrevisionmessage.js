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
import _0x481c02 from'./../../message.js';export default class RevisionHistoryGetRevisionMessage extends _0x481c02{['documentId'];['revisionId'];static ['TYPE']='123';static ['READABLE_TYPE_NAME']='getRevision';static ['DESCRIPTOR_NAME']='RevisionHistoryGetRevisionMessage';static ['DESCRIPTOR']={'fields':{'documentId':{'type':'string','id':0x1},'revisionId':{'type':'string','id':0x2}}};constructor(_0x44878d,_0x533d70){super(),this['documentId']=_0x44878d,this['revisionId']=_0x533d70;}['toJSON'](){return{'documentId':this['documentId'],'revisionId':this['revisionId']};}static['fromJSON'](_0x36bab8){return new RevisionHistoryGetRevisionMessage(_0x36bab8['documentId'],_0x36bab8['revisionId']);}}
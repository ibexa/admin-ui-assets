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
import _0x13bce5 from'../../../message.js';export default class ReopenCommentThreadMessage extends _0x13bce5{['commentThreadId'];['documentId'];static ['TYPE']='141';static ['READABLE_TYPE_NAME']='reopenCommentThread';static ['DESCRIPTOR_NAME']='CommentsV2ReopenCommentThreadMessage';static ['DESCRIPTOR']={'fields':{'commentThreadId':{'type':'string','id':0x1},'documentId':{'type':'string','id':0x2}}};constructor(_0x332f6d,_0x41ca25){super(),this['commentThreadId']=_0x332f6d,this['documentId']=_0x41ca25;}['toJSON'](){return{'documentId':this['documentId'],'commentThreadId':this['commentThreadId']};}static['fromJSON'](_0x17a36c){return new ReopenCommentThreadMessage(_0x17a36c['commentThreadId'],_0x17a36c['documentId']);}}
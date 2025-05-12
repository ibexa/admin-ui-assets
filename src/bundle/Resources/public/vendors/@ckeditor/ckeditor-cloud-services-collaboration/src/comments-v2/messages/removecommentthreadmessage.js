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
import _0x3f9c42 from'./../../message.js';export default class RemoveCommentThreadMessage extends _0x3f9c42{['documentId'];['commentThreadId'];static ['TYPE']='97';static ['READABLE_TYPE_NAME']='removeCommentThread';static ['DESCRIPTOR_NAME']='CommentsV2RemoveCommentThreadMessage';static ['DESCRIPTOR']={'fields':{'commentThreadId':{'type':'string','id':0x1},'documentId':{'type':'string','id':0x2}}};constructor(_0x46449e,_0x13de4c){super(),this['documentId']=_0x46449e,this['commentThreadId']=_0x13de4c;}['toJSON'](){return{'documentId':this['documentId'],'commentThreadId':this['commentThreadId']};}static['fromJSON'](_0x219f29){return new RemoveCommentThreadMessage(_0x219f29['documentId'],_0x219f29['commentThreadId']);}}
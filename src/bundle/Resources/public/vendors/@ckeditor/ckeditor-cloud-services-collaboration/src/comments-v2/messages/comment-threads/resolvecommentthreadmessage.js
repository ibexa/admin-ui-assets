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
import _0x5563ba from'../../../message.js';export default class ResolveCommentThreadMessage extends _0x5563ba{['commentThreadId'];['documentId'];['resolvedBy'];['resolvedAt'];static ['TYPE']='142';static ['READABLE_TYPE_NAME']='resolveCommentThread';static ['DESCRIPTOR_NAME']='CommentsV2ResolveCommentThreadMessage';static ['DESCRIPTOR']={'fields':{'commentThreadId':{'type':'string','id':0x1},'documentId':{'type':'string','id':0x2},'resolvedBy':{'type':'string','id':0x3},'resolvedAt':{'type':'string','id':0x4}}};constructor(_0x59f729,_0x2ec82b,_0x106fa2,_0x79455b){super(),this['commentThreadId']=_0x59f729,this['documentId']=_0x2ec82b,this['resolvedBy']=_0x106fa2,this['resolvedAt']=_0x79455b?new Date(_0x79455b):void 0x0;}['toJSON'](){return{'documentId':this['documentId'],'commentThreadId':this['commentThreadId'],'resolvedBy':this['resolvedBy'],'resolvedAt':this['resolvedAt']?.['toISOString']()};}static['fromJSON'](_0x539608){return new ResolveCommentThreadMessage(_0x539608['commentThreadId'],_0x539608['documentId'],_0x539608['resolvedBy'],_0x539608['resolvedAt']);}}
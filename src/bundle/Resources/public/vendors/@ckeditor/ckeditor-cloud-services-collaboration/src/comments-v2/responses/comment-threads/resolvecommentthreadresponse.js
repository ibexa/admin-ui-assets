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
import _0x500610 from'./../../../message.js';export default class ResolveCommentThreadResponse extends _0x500610{['commentThreadId'];['documentId'];['resolvedBy'];['resolvedAt'];static ['DESCRIPTOR_NAME']='CommentsV2ResolveCommentThreadResponse';static ['DESCRIPTOR']={'fields':{'commentThreadId':{'type':'string','id':0x1},'documentId':{'type':'string','id':0x2},'resolvedAt':{'type':'string','id':0x3},'resolvedBy':{'type':'string','id':0x4}}};constructor(_0x342d0e,_0x1753bb,_0x53ebf0,_0x20d7c1){super(),this['commentThreadId']=_0x342d0e,this['documentId']=_0x1753bb,this['resolvedBy']=_0x53ebf0,this['resolvedAt']=new Date(_0x20d7c1);}['toJSON'](){return{'commentThreadId':this['commentThreadId'],'documentId':this['documentId'],'resolvedBy':this['resolvedBy'],'resolvedAt':this['resolvedAt']['toISOString']()};}static['fromJSON'](_0x4f8640){return new ResolveCommentThreadResponse(_0x4f8640['commentThreadId'],_0x4f8640['documentId'],_0x4f8640['resolvedBy'],_0x4f8640['resolvedAt']);}}
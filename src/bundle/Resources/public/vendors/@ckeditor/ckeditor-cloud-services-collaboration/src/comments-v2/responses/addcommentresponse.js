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
import _0x5db543 from'./../../message.js';export default class AddCommentResponse extends _0x5db543{['commentThreadId'];['commentId'];['createdAt'];static ['DESCRIPTOR_NAME']='CommentsV2AddCommentResponse';static ['DESCRIPTOR']={'fields':{'commentThreadId':{'type':'string','id':0x1},'commentId':{'type':'string','id':0x2},'createdAt':{'type':'string','id':0x3}}};constructor(_0x4b489f,_0x365d73,_0xce0ddb){super(),this['commentThreadId']=_0x4b489f,this['commentId']=_0x365d73,this['createdAt']=new Date(_0xce0ddb);}['toJSON'](){return{'commentThreadId':this['commentThreadId'],'commentId':this['commentId'],'createdAt':this['createdAt']['toISOString']()};}static['fromJSON'](_0x3add3b){return new AddCommentResponse(_0x3add3b['commentThreadId'],_0x3add3b['commentId'],_0x3add3b['createdAt']);}}
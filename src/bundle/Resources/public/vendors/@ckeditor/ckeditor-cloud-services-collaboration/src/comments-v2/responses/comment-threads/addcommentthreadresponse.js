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
import _0x64c5c3 from'./../../../message.js';import _0x39b471 from'../../descriptors/commentthreadaddedcomment.js';export default class AddCommentThreadResponse extends _0x64c5c3{['commentThreadId'];['comments'];['createdAt'];static ['DESCRIPTOR_NAME']='CommentsV2AddCommentThreadResponse';static ['DESCRIPTOR']={'fields':{'commentThreadId':{'type':'string','id':0x1},'createdAt':{'type':'string','id':0x2},'comments':{'type':'CommentThreadAddedCommentDescriptor','rule':'repeated','id':0x3}}};constructor(_0x251d3a,_0x51c691,_0x49cc6f=[]){super(),this['commentThreadId']=_0x251d3a,this['comments']=_0x49cc6f,this['createdAt']=new Date(_0x51c691);}['toJSON'](){return{'commentThreadId':this['commentThreadId'],'createdAt':this['createdAt']['toISOString'](),'comments':this['comments']['map'](_0x262ac3=>_0x39b471['toJSON'](_0x262ac3))};}static['fromJSON'](_0x3d0b20){return new AddCommentThreadResponse(_0x3d0b20['commentThreadId'],_0x3d0b20['createdAt'],_0x3d0b20['comments']['map'](_0x5c663b=>_0x39b471['fromJSON'](_0x5c663b)));}}
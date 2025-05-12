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
import _0x68a2a4 from'./../../message.js';export default class RemoveCommentMessage extends _0x68a2a4{['documentId'];['commentThreadId'];['commentId'];static ['TYPE']='95';static ['READABLE_TYPE_NAME']='removeComment';static ['DESCRIPTOR_NAME']='CommentsV2RemoveCommentMessage';static ['DESCRIPTOR']={'fields':{'commentThreadId':{'type':'string','id':0x1},'commentId':{'type':'string','id':0x2},'documentId':{'type':'string','id':0x3}}};constructor(_0x1c2175,_0x1fc90f,_0x474ba1){super(),this['documentId']=_0x1c2175,this['commentThreadId']=_0x1fc90f,this['commentId']=_0x474ba1;}['toJSON'](){return{'documentId':this['documentId'],'commentThreadId':this['commentThreadId'],'commentId':this['commentId']};}static['fromJSON'](_0x181cba){return new RemoveCommentMessage(_0x181cba['documentId'],_0x181cba['commentThreadId'],_0x181cba['commentId']);}}
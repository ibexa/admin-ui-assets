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
import _0xf727a2 from'./../../message.js';import _0x4a3fc2 from'../descriptors/commentsthreaddescriptor.js';export default class AddCommentMessage extends _0xf727a2{['documentId'];['commentThreadId'];['content'];['commentId'];['userId'];['attributes'];['commentThread'];['createdAt'];static ['TYPE']='91';static ['READABLE_TYPE_NAME']='addComment';static ['DESCRIPTOR_NAME']='CommentsV2AddCommentMessage';static ['DESCRIPTOR']={'fields':{'commentThreadId':{'type':'string','id':0x1},'content':{'type':'string','id':0x2},'documentId':{'type':'string','id':0x3},'commentId':{'type':'string','id':0x4},'createdAt':{'type':'string','id':0x5},'userId':{'type':'string','id':0x6},'attributes':{'type':'string','id':0x7},'commentThread':{'type':'CommentsThreadDescriptor','id':0x8}}};constructor(_0x4901cf,_0x28375f,_0x4c46ea,_0x5b389e='',_0x57ae76,_0x1ccc1a='',_0x4b5136=null,_0x188c53){super(),this['documentId']=_0x4901cf,this['commentThreadId']=_0x28375f,this['content']=_0x4c46ea,this['commentId']=_0x5b389e,this['userId']=_0x1ccc1a,this['attributes']=_0x4b5136,this['commentThread']=_0x188c53,this['createdAt']=_0x57ae76?new Date(_0x57ae76):'';}['toJSON'](){return{'commentThreadId':this['commentThreadId'],'content':this['content'],'documentId':this['documentId'],'commentId':this['commentId'],'createdAt':this['createdAt']instanceof Date?this['createdAt']['toISOString']():this['createdAt'],'userId':this['userId'],'attributes':JSON['stringify'](this['attributes']),'commentThread':this['commentThread']?_0x4a3fc2['toJSON'](this['commentThread']):void 0x0};}static['fromJSON'](_0x147f0f){return new AddCommentMessage(_0x147f0f['documentId'],_0x147f0f['commentThreadId'],_0x147f0f['content'],_0x147f0f['commentId']?_0x147f0f['commentId']:void 0x0,_0x147f0f['createdAt']?new Date(_0x147f0f['createdAt']):void 0x0,_0x147f0f['userId']?_0x147f0f['userId']:void 0x0,_0x147f0f['attributes']?JSON['parse'](_0x147f0f['attributes']):{},_0x147f0f['commentThread']?_0x4a3fc2['fromJSON'](_0x147f0f['commentThread']):void 0x0);}}
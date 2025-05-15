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
import _0x8da877 from'../../../message.js';import _0x53464b from'../../descriptors/commentdescriptor.js';export default class AddCommentThreadMessage extends _0x8da877{['documentId'];['commentThreadId'];['comments'];['context'];['resolvedBy'];['attributes'];['createdAt'];['resolvedAt'];['deletedAt'];static ['TYPE']='140';static ['READABLE_TYPE_NAME']='addCommentThread';static ['DESCRIPTOR_NAME']='CommentsV2AddCommentThreadMessage';static ['DESCRIPTOR']={'fields':{'documentId':{'type':'string','id':0x1},'commentThreadId':{'type':'string','id':0x2},'context':{'type':'string','id':0x3},'createdAt':{'type':'string','id':0x4},'resolvedAt':{'type':'string','id':0x5},'resolvedBy':{'type':'string','id':0x6},'attributes':{'type':'string','id':0x7},'deletedAt':{'type':'string','id':0x8},'comments':{'type':'CommentDescriptor','rule':'repeated','id':0x9}}};constructor(_0x32bc4c,_0x55a0d9,_0x391ab5=[],_0x594556,_0x253fb4=null,_0x299337=null,_0x2ec5d9=null,_0x3111fb=null,_0x19cc07=null){super(),this['documentId']=_0x32bc4c,this['commentThreadId']=_0x55a0d9,this['comments']=_0x391ab5,this['context']=_0x594556,this['resolvedBy']=_0x253fb4,this['attributes']=_0x19cc07,this['createdAt']=_0x299337?new Date(_0x299337):'',this['resolvedAt']=_0x2ec5d9?new Date(_0x2ec5d9):'',this['deletedAt']=_0x3111fb?new Date(_0x3111fb):'';}['toJSON'](){return{'commentThreadId':this['commentThreadId'],'context':this['context']?JSON['stringify'](this['context']):this['context'],'documentId':this['documentId'],'resolvedBy':this['resolvedBy'],'resolvedAt':this['resolvedAt']instanceof Date?this['resolvedAt']['toISOString']():this['resolvedAt'],'deletedAt':this['deletedAt']instanceof Date?this['deletedAt']['toISOString']():this['deletedAt'],'createdAt':this['createdAt']instanceof Date?this['createdAt']['toISOString']():this['createdAt'],'attributes':this['attributes']?JSON['stringify'](this['attributes']):this['attributes'],'comments':this['comments']?.['map'](_0x88be8b=>_0x53464b['toJSON'](_0x88be8b))};}static['fromJSON'](_0x4424c0){return new AddCommentThreadMessage(_0x4424c0['documentId'],_0x4424c0['commentThreadId'],_0x4424c0['comments']?.['map'](_0x18e279=>_0x53464b['fromJSON']({..._0x18e279,'documentId':_0x4424c0['documentId'],'commentThreadId':_0x4424c0['commentThreadId']})),_0x4424c0['context']?JSON['parse'](_0x4424c0['context']):_0x4424c0['context'],_0x4424c0['resolvedBy'],_0x4424c0['createdAt']?new Date(_0x4424c0['createdAt']):void 0x0,_0x4424c0['resolvedAt']?new Date(_0x4424c0['resolvedAt']):void 0x0,_0x4424c0['deletedAt']?new Date(_0x4424c0['deletedAt']):void 0x0,_0x4424c0['attributes']?JSON['parse'](_0x4424c0['attributes']):_0x4424c0['attributes']);}}
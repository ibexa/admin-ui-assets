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
import _0xd677fb from'./../../message.js';import _0x74b95a from'../descriptors/commentsthreaddescriptor.js';export default class UpdateCommentMessage extends _0xd677fb{['documentId'];['commentThreadId'];['commentId'];['content'];['attributes'];['isAttributesUpdated'];['commentThread'];static ['TYPE']='96';static ['READABLE_TYPE_NAME']='updateComment';static ['DESCRIPTOR_NAME']='CommentsV2UpdateCommentMessage';static ['DESCRIPTOR']={'fields':{'commentThreadId':{'type':'string','id':0x1},'commentId':{'type':'string','id':0x2},'content':{'type':'string','id':0x3},'documentId':{'type':'string','id':0x4},'attributes':{'type':'string','id':0x5},'isAttributesUpdated':{'type':'bool','id':0x6},'commentThread':{'type':'CommentsThreadDescriptor','id':0x7}}};constructor(_0x1d6c85,_0x317d04,_0x192fa8,_0x463d0a,_0x5dbf40=null,_0x2ae158=!0x1,_0x5886fc){super(),this['documentId']=_0x1d6c85,this['commentThreadId']=_0x317d04,this['commentId']=_0x192fa8,this['content']=_0x463d0a,this['attributes']=_0x5dbf40,this['isAttributesUpdated']=_0x2ae158,this['commentThread']=_0x5886fc;}['toJSON'](){return{'documentId':this['documentId'],'commentThreadId':this['commentThreadId'],'commentId':this['commentId'],'content':this['content'],'attributes':this['attributes']?JSON['stringify'](this['attributes']):null,'isAttributesUpdated':this['isAttributesUpdated'],'commentThread':this['commentThread']?_0x74b95a['toJSON'](this['commentThread']):void 0x0};}static['fromJSON'](_0x3602ec){return new UpdateCommentMessage(_0x3602ec['documentId'],_0x3602ec['commentThreadId'],_0x3602ec['commentId'],_0x3602ec['content'],_0x3602ec['attributes']?JSON['parse'](_0x3602ec['attributes']):null,_0x3602ec['isAttributesUpdated'],_0x3602ec['commentThread']?_0x74b95a['fromJSON'](_0x3602ec['commentThread']):void 0x0);}}
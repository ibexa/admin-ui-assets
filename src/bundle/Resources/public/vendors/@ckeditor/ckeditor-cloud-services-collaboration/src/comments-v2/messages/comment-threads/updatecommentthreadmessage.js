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
import _0x2e3c74 from'../../../message.js';export default class UpdateCommentThreadMessage extends _0x2e3c74{['commentThreadId'];['documentId'];['context'];['attributes'];['unlinkedAt'];static ['TYPE']='143';static ['READABLE_TYPE_NAME']='updateCommentThread';static ['DESCRIPTOR_NAME']='CommentsV2UpdateCommentThreadMessage';static ['DESCRIPTOR']={'fields':{'commentThreadId':{'type':'string','id':0x1},'documentId':{'type':'string','id':0x2},'context':{'type':'string','id':0x3},'attributes':{'type':'string','id':0x4},'unlinkedAt':{'type':'string','id':0x5}}};constructor(_0x4cba31,_0x2b4607,_0x588e89,_0x3fff17=null,_0x31615a=null){super(),this['commentThreadId']=_0x4cba31,this['documentId']=_0x2b4607,this['context']=_0x588e89,this['attributes']=_0x3fff17,this['unlinkedAt']=_0x31615a?new Date(_0x31615a):'';}['toJSON'](){return{'documentId':this['documentId'],'commentThreadId':this['commentThreadId'],'context':this['context']?JSON['stringify'](this['context']):this['context'],'attributes':this['attributes']?JSON['stringify'](this['attributes']):null,'unlinkedAt':this['unlinkedAt']instanceof Date?this['unlinkedAt']['toISOString']():this['unlinkedAt']};}static['fromJSON'](_0xdbbbb8){return new UpdateCommentThreadMessage(_0xdbbbb8['commentThreadId'],_0xdbbbb8['documentId'],_0xdbbbb8['context']?JSON['parse'](_0xdbbbb8['context']):_0xdbbbb8['context'],_0xdbbbb8['attributes']?JSON['parse'](_0xdbbbb8['attributes']):null,_0xdbbbb8['unlinkedAt']?new Date(_0xdbbbb8['unlinkedAt']):null);}}
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
import _0x313d15 from'./../../message.js';import _0x2d231f from'../descriptors/commentdescriptor.js';export default class GetCommentThreadResponse extends _0x313d15{['commentThreadId'];['_comments'];['_commentsV2'];['resolvedBy'];['comments'];['createdAt'];['deletedAt'];['resolvedAt'];['attributes'];['context'];['unlinkedAt'];static ['DESCRIPTOR_NAME']='CommentsV2GetCommentThreadResponse';static ['DESCRIPTOR']={'fields':{'commentThreadId':{'type':'string','id':0x1},'comments':{'type':'string','rule':'repeated','id':0x2},'commentsV2':{'type':'CommentDescriptor','rule':'repeated','id':0x3},'resolvedAt':{'type':'string','id':0x4},'resolvedBy':{'type':'string','id':0x5},'context':{'type':'string','id':0x6},'createdAt':{'type':'string','id':0x7},'deletedAt':{'type':'string','id':0x8},'attributes':{'type':'string','id':0x9},'unlinkedAt':{'type':'string','id':0xa}}};constructor(_0x5a063f,_0xafca39,_0xd1a0ce,_0x390abd,_0x1c2128,_0x4e1779,_0x1bbb19,_0x2f8ba6,_0x5a0314,_0x23be06){super(),this['commentThreadId']=_0x5a063f,this['_comments']=_0xafca39,this['_commentsV2']=_0xd1a0ce,this['resolvedBy']=_0x1c2128,this['comments']=_0xd1a0ce?.['length']?_0xd1a0ce:_0xafca39,this['createdAt']=_0x1bbb19?new Date(_0x1bbb19):void 0x0,this['deletedAt']='string'==typeof _0x2f8ba6?new Date(_0x2f8ba6):_0x2f8ba6,this['resolvedAt']='string'==typeof _0x5a0314?new Date(_0x5a0314):_0x5a0314,this['unlinkedAt']='string'==typeof _0x23be06?new Date(_0x23be06):_0x23be06,this['attributes']='string'==typeof _0x390abd?JSON['parse'](_0x390abd):_0x390abd,this['context']='string'==typeof _0x4e1779?JSON['parse'](_0x4e1779):_0x4e1779;}['toJSON'](){return{'commentThreadId':this['commentThreadId'],'comments':this['_comments']?.['map'](_0x3df3cf=>JSON['stringify'](_0x3df3cf)),'commentsV2':this['_commentsV2']?.['map'](_0x2d231f['toJSON']),'attributes':this['attributes']?JSON['stringify'](this['attributes']):this['attributes'],'context':this['context']?JSON['stringify'](this['context']):this['context'],'resolvedBy':this['resolvedBy'],'createdAt':this['createdAt']?.['toISOString'](),'deletedAt':this['deletedAt']?.['toISOString'](),'resolvedAt':this['resolvedAt']?.['toISOString'](),'unlinkedAt':this['unlinkedAt']?.['toISOString']()};}static['fromJSON'](_0x1c0f74){return new GetCommentThreadResponse(_0x1c0f74['commentThreadId'],_0x1c0f74['comments']?.['map'](_0x55fce1=>function(_0x3e53b0){const _0x23f062=JSON['parse'](_0x3e53b0);return{..._0x23f062,'createdAt':new Date(_0x23f062['createdAt'])};}(_0x55fce1)),_0x1c0f74['commentsV2']?.['map'](_0x2d231f['fromJSON']),_0x1c0f74['attributes']?JSON['parse'](_0x1c0f74['attributes']):_0x1c0f74['attributes'],_0x1c0f74['resolvedBy'],_0x1c0f74['context']?JSON['parse'](_0x1c0f74['context']):_0x1c0f74['context'],_0x1c0f74['createdAt'],_0x1c0f74['deletedAt'],_0x1c0f74['resolvedAt'],_0x1c0f74['unlinkedAt']);}}
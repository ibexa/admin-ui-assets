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
import _0x145b53 from'./../../descriptor.js';import _0x5230ac from'./commentdescriptor.js';export default class CommentsThreadDescriptor extends _0x145b53{static ['DESCRIPTOR_NAME']='CommentsThreadDescriptor';static ['DESCRIPTOR']={'fields':{'commentThreadId':{'type':'string','id':0x1},'comments':{'type':'CommentDescriptor','rule':'repeated','id':0x2},'resolvedAt':{'type':'string','id':0x3},'resolvedBy':{'type':'string','id':0x4},'context':{'type':'string','id':0x5},'createdAt':{'type':'string','id':0x6},'deletedAt':{'type':'string','id':0x7},'attributes':{'type':'string','id':0x8},'unlinkedAt':{'type':'string','id':0x9}}};static['toJSON'](_0x461f09){return{..._0x461f09,'createdAt':_0x461f09['createdAt']?.['toISOString'](),'deletedAt':_0x461f09['deletedAt']?.['toISOString'](),'resolvedAt':_0x461f09['resolvedAt']?.['toISOString'](),'attributes':_0x461f09['attributes']?JSON['stringify'](_0x461f09['attributes']):null,'context':_0x461f09['context']?JSON['stringify'](_0x461f09['context']):_0x461f09['context'],'comments':_0x461f09['comments']?.['map'](_0x5230ac['toJSON']),'unlinkedAt':_0x461f09['unlinkedAt']?.['toISOString']()};}static['fromJSON'](_0xef84b1){return{..._0xef84b1,'createdAt':_0xef84b1['createdAt']?new Date(_0xef84b1['createdAt']):void 0x0,'deletedAt':_0xef84b1['deletedAt']?new Date(_0xef84b1['deletedAt']):void 0x0,'resolvedAt':_0xef84b1['resolvedAt']?new Date(_0xef84b1['resolvedAt']):void 0x0,'attributes':_0xef84b1['attributes']?JSON['parse'](_0xef84b1['attributes']):null,'context':_0xef84b1['context']?JSON['parse'](_0xef84b1['context']):void 0x0,'comments':_0xef84b1['comments']?.['map'](_0x5230ac['fromJSON']),'unlinkedAt':_0xef84b1['unlinkedAt']?new Date(_0xef84b1['unlinkedAt']):void 0x0};}}
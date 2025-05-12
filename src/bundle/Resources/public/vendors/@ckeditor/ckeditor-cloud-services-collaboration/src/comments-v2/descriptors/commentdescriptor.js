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
import _0x24a9b1 from'./../../descriptor.js';export default class CommentDescriptor extends _0x24a9b1{static ['DESCRIPTOR_NAME']='CommentDescriptor';static ['DESCRIPTOR']={'fields':{'commentId':{'id':0x1,'type':'string'},'commentThreadId':{'id':0x2,'type':'string'},'userId':{'id':0x3,'type':'string'},'content':{'id':0x4,'type':'string'},'documentId':{'id':0x5,'type':'string'},'createdAt':{'id':0x6,'type':'string'},'attributes':{'id':0x7,'type':'string'}}};static['toJSON'](_0x43183c){return{..._0x43183c,'createdAt':_0x43183c['createdAt']?.['toISOString'](),'attributes':_0x43183c['attributes']?JSON['stringify'](_0x43183c['attributes']):null};}static['fromJSON'](_0x505546){return{..._0x505546,'createdAt':new Date(_0x505546['createdAt']),'attributes':_0x505546['attributes']?JSON['parse'](_0x505546['attributes']):null};}}
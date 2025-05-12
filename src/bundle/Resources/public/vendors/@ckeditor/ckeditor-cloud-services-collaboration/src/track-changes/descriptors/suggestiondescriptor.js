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
import _0x49c75c from'./../../descriptor.js';export default class SuggestionDescriptor extends _0x49c75c{static ['DESCRIPTOR_NAME']='SuggestionDescriptor';static ['DESCRIPTOR']={'fields':{'id':{'id':0x1,'type':'string'},'authorId':{'id':0x2,'type':'string'},'type':{'id':0x3,'type':'string'},'createdAt':{'id':0x4,'type':'string'},'data':{'id':0x5,'type':'string'},'hasComments':{'id':0x6,'type':'bool'},'state':{'id':0x7,'type':'string'},'attributes':{'id':0x8,'type':'string'}}};static['toJSON'](_0x1b76d7){return{..._0x1b76d7,'data':_0x1b76d7['data']?JSON['stringify'](_0x1b76d7['data']):_0x1b76d7['data'],'attributes':_0x1b76d7['attributes']?JSON['stringify'](_0x1b76d7['attributes']):_0x1b76d7['attributes'],'createdAt':_0x1b76d7['createdAt']?.['toISOString']()};}static['fromJSON'](_0xab4973){return{..._0xab4973,'data':_0xab4973['data']?JSON['parse'](_0xab4973['data']):_0xab4973['data'],'attributes':_0xab4973['attributes']?JSON['parse'](_0xab4973['attributes']):_0xab4973['attributes'],'createdAt':_0xab4973['createdAt']?new Date(_0xab4973['createdAt']):void 0x0};}}
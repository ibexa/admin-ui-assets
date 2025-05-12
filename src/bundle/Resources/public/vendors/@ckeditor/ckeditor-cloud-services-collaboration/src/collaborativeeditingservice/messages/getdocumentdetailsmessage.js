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
import _0x1b43b8 from'../../message.js';export default class GetDocumentDetailsMessage extends _0x1b43b8{['documentId'];static ['TYPE']='14';static ['READABLE_TYPE_NAME']='getDocumentDetails';static ['DESCRIPTOR_NAME']='GetDocumentDetailsMessage';static ['DESCRIPTOR']={'fields':{'documentId':{'type':'string','id':0x1},'environmentId':{'type':'string','id':0x2}}};constructor(_0x6d07e4){super(),this['documentId']=_0x6d07e4;}get['data'](){return{'documentId':this['documentId']};}['toJSON'](){return{'documentId':this['documentId']};}static['fromJSON'](_0x1b1cff){return new GetDocumentDetailsMessage(_0x1b1cff['documentId']);}}
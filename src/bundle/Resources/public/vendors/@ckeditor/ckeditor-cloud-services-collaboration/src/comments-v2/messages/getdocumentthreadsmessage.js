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
import _0x383435 from'./../../message.js';export default class GetDocumentThreadsMessage extends _0x383435{['documentId'];static ['TYPE']='94';static ['READABLE_TYPE_NAME']='getDocumentThreads';static ['DESCRIPTOR_NAME']='CommentsV2GetDocumentThreadsMessage';static ['DESCRIPTOR']={'fields':{'documentId':{'type':'string','id':0x1}}};constructor(_0x49c7c7){super(),this['documentId']=_0x49c7c7;}['toJSON'](){return{'documentId':this['documentId']};}static['fromJSON'](_0x2a1b96){return new GetDocumentThreadsMessage(_0x2a1b96['documentId']);}}
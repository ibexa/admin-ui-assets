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
import _0x38a01e from'./../../message.js';export default class GetCommentThreadMessage extends _0x38a01e{['commentThreadId'];['documentId'];static ['TYPE']='93';static ['READABLE_TYPE_NAME']='getComment';static ['DESCRIPTOR_NAME']='CommentsV2GetCommentThreadMessage';static ['DESCRIPTOR']={'fields':{'commentThreadId':{'type':'string','id':0x1},'documentId':{'type':'string','id':0x2}}};constructor(_0x5ae73e,_0x1109b1){super(),this['commentThreadId']=_0x5ae73e,this['documentId']=_0x1109b1;}['toJSON'](){return{'commentThreadId':this['commentThreadId'],'documentId':this['documentId']};}static['fromJSON'](_0x37b00a){return new GetCommentThreadMessage(_0x37b00a['commentThreadId'],_0x37b00a['documentId']);}}
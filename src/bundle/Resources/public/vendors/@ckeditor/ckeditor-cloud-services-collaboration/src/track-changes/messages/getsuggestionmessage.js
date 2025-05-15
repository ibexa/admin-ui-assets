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
import _0x3a6066 from'./../../message.js';export default class GetSuggestionMessage extends _0x3a6066{['id'];['documentId'];static ['TYPE']='103';static ['READABLE_TYPE_NAME']='getSuggestion';static ['DESCRIPTOR_NAME']='TrackChangesGetSuggestionMessage';static ['DESCRIPTOR']={'fields':{'id':{'type':'string','id':0x1},'documentId':{'type':'string','id':0x2}}};constructor(_0x43d1cc,_0x130bd7){super(),this['id']=_0x43d1cc,this['documentId']=_0x130bd7;}['toJSON'](){return{'id':this['id'],'documentId':this['documentId']};}static['fromJSON'](_0x396a77){return new GetSuggestionMessage(_0x396a77['id'],_0x396a77['documentId']);}}
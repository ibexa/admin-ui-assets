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
import _0x5b9a04 from'./../../message.js';export default class GetAllSuggestionsMessage extends _0x5b9a04{['documentId'];static ['TYPE']='102';static ['READABLE_TYPE_NAME']='getAllSuggestions';static ['DESCRIPTOR_NAME']='TrackChangesGetAllSuggestionMessage';static ['DESCRIPTOR']={'fields':{'documentId':{'type':'string','id':0x1}}};constructor(_0x2258e6){super(),this['documentId']=_0x2258e6;}['toJSON'](){return{'documentId':this['documentId']};}static['fromJSON'](_0x3878d8){return new GetAllSuggestionsMessage(_0x3878d8['documentId']);}}
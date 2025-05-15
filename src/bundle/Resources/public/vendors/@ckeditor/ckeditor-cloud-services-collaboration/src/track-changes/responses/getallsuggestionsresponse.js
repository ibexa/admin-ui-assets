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
import _0x4ec54f from'./../../message.js';import _0x8661db from'../descriptors/suggestiondescriptor.js';export default class GetAllSuggestionResponse extends _0x4ec54f{['_suggestions'];['_suggestionsV2'];['suggestions'];static ['DESCRIPTOR_NAME']='TrackChangesGetAllSuggestionsResponse';static ['DESCRIPTOR']={'fields':{'suggestions':{'type':'string','rule':'repeated','id':0x1},'suggestionsV2':{'type':'SuggestionDescriptor','rule':'repeated','id':0x2}}};constructor(_0x1bd165,_0x10007f){super(),this['_suggestions']=_0x1bd165,this['_suggestionsV2']=_0x10007f,this['suggestions']=_0x10007f?.['length']?_0x10007f:_0x1bd165;}['toJSON'](){return{'suggestions':this['_suggestions']?.['map'](_0x4d5707=>JSON['stringify'](_0x4d5707)),'suggestionsV2':this['_suggestionsV2']?.['map'](_0x8661db['toJSON'])};}static['fromJSON'](_0x48cfbf){return new GetAllSuggestionResponse(_0x48cfbf['suggestions']?.['map'](_suggestionFromString),_0x48cfbf['suggestionsV2']?.['map'](_0x8661db['fromJSON']));}}function _suggestionFromString(_0x496bd8){const _0x3ea635=JSON['parse'](_0x496bd8);return _0x3ea635['createdAt']=_0x3ea635['createdAt']?new Date(_0x3ea635['createdAt']):void 0x0,_0x3ea635;}
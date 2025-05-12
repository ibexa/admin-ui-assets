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
import _0x33ebec from'./../../message.js';import _0x105984 from'../descriptors/suggestiondescriptor.js';export default class ConnectResponse extends _0x33ebec{['channel'];['_suggestions'];['_suggestionsV2'];['suggestions'];static ['DESCRIPTOR_NAME']='TrackChangesConnectResponse';static ['DESCRIPTOR']={'fields':{'channel':{'type':'string','id':0x1},'suggestions':{'type':'string','rule':'repeated','id':0x2},'suggestionsV2':{'type':'SuggestionDescriptor','rule':'repeated','id':0x3}}};constructor(_0x46417f,_0x2c4a6b,_0x10eda5){super(),this['channel']=_0x46417f,this['_suggestions']=_0x2c4a6b,this['_suggestionsV2']=_0x10eda5,this['suggestions']=_0x10eda5?.['length']?_0x10eda5:_0x2c4a6b;}['toJSON'](){return{'channel':this['channel'],'suggestions':this['_suggestions']?.['map'](_0x4c4bf1=>JSON['stringify'](_0x4c4bf1)),'suggestionsV2':this['_suggestionsV2']?.['map'](_0x105984['toJSON'])};}static['fromJSON'](_0x5e9d32){return new ConnectResponse(_0x5e9d32['channel'],_0x5e9d32['suggestions']?.['map'](_0x11f308=>JSON['parse'](_0x11f308)),_0x5e9d32['suggestionsV2']?.['map'](_0x105984['fromJSON']));}}
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
import _0x5097f8 from'./../../message.js';export default class AddSuggestionMessage extends _0x5097f8{['id'];['documentId'];['type'];['data'];['originalSuggestionId'];['attributes'];static ['TYPE']='101';static ['READABLE_TYPE_NAME']='addSuggestion';static ['DESCRIPTOR_NAME']='TrackChangesAddSuggestionMessage';static ['DESCRIPTOR']={'fields':{'id':{'type':'string','id':0x1},'documentId':{'type':'string','id':0x2},'type':{'type':'string','id':0x3},'data':{'type':'string','id':0x4},'originalSuggestionId':{'type':'string','id':0x5},'attributes':{'type':'string','id':0x6}}};constructor(_0x4eafab,_0x3b4636,_0x14b1f0,_0x2c1d2a={},_0x5a5911=null,_0x186b6a=null){super(),this['id']=_0x4eafab,this['documentId']=_0x3b4636,this['type']=_0x14b1f0,this['data']=_0x2c1d2a,this['originalSuggestionId']=_0x5a5911,this['attributes']=_0x186b6a;}['toJSON'](){return{'id':this['id'],'documentId':this['documentId'],'type':this['type'],'data':JSON['stringify'](this['data']),'originalSuggestionId':this['originalSuggestionId'],'attributes':JSON['stringify'](this['attributes'])};}static['fromJSON'](_0x20d7b5){return new AddSuggestionMessage(_0x20d7b5['id'],_0x20d7b5['documentId'],_0x20d7b5['type'],JSON['parse'](_0x20d7b5['data']),_0x20d7b5['originalSuggestionId']??null,_0x20d7b5['attributes']?JSON['parse'](_0x20d7b5['attributes']):null);}}
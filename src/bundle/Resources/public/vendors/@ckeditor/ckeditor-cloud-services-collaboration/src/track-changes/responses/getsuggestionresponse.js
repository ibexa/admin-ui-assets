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
import _0x5070ea from'./../../message.js';export default class GetSuggestionResponse extends _0x5070ea{['id'];['authorId'];['type'];['hasComments'];['state'];['data'];['attributes'];['createdAt'];static ['DESCRIPTOR_NAME']='TrackChangesGetSuggestionResponse';static ['DESCRIPTOR']={'fields':{'id':{'type':'string','id':0x1},'authorId':{'type':'string','id':0x2},'type':{'type':'string','id':0x3},'createdAt':{'type':'string','id':0x4},'data':{'type':'string','id':0x5},'hasComments':{'type':'bool','id':0x6},'state':{'type':'string','id':0x7},'attributes':{'type':'string','id':0x8}}};constructor(_0x21aee3,_0x118d21,_0x5d88de,_0x8aa42e,_0x5bbe1c,_0xf0f285,_0x48683c={},_0x1bf402=null){super(),this['id']=_0x21aee3,this['authorId']=_0x118d21,this['type']=_0x5d88de,this['hasComments']=_0x5bbe1c,this['state']=_0xf0f285,this['data']=_0x48683c,this['attributes']=_0x1bf402,this['createdAt']=new Date(_0x8aa42e);}['toJSON'](){return{'id':this['id'],'authorId':this['authorId'],'type':this['type'],'createdAt':this['createdAt']['toISOString'](),'data':JSON['stringify'](this['data']),'hasComments':this['hasComments'],'state':this['state'],'attributes':JSON['stringify'](this['attributes'])};}static['fromJSON'](_0x27fb7c){return new GetSuggestionResponse(_0x27fb7c['id'],_0x27fb7c['authorId'],_0x27fb7c['type'],_0x27fb7c['createdAt'],_0x27fb7c['hasComments'],_0x27fb7c['state'],JSON['parse'](_0x27fb7c['data']),_0x27fb7c['attributes']?JSON['parse'](_0x27fb7c['attributes']):null);}}
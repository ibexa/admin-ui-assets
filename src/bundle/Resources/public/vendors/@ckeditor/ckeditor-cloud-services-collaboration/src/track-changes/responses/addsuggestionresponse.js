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
import _0x486a58 from'./../../message.js';export default class AddSuggestionResponse extends _0x486a58{['id'];['authorId'];['type'];['hasComments'];['state'];['data'];['attributes'];['createdAt'];static ['DESCRIPTOR_NAME']='TrackChangesAddSuggestionResponse';static ['DESCRIPTOR']={'fields':{'id':{'type':'string','id':0x1},'authorId':{'type':'string','id':0x2},'type':{'type':'string','id':0x3},'createdAt':{'type':'string','id':0x4},'data':{'type':'string','id':0x5},'hasComments':{'type':'bool','id':0x6},'state':{'type':'string','id':0x7},'attributes':{'type':'string','id':0x8}}};constructor(_0x3839aa,_0x1a9a47,_0x4c5a29,_0x4fab3a,_0x4fc2a6,_0x1c4ba2,_0x41784a={},_0x1307dc=null){super(),this['id']=_0x3839aa,this['authorId']=_0x1a9a47,this['type']=_0x4c5a29,this['hasComments']=_0x4fc2a6,this['state']=_0x1c4ba2,this['data']=_0x41784a,this['attributes']=_0x1307dc,this['createdAt']=_0x4fab3a?new Date(_0x4fab3a):void 0x0;}['toJSON'](){return{'id':this['id'],'authorId':this['authorId'],'type':this['type'],'createdAt':this['createdAt']?.['toISOString'](),'data':JSON['stringify'](this['data']),'hasComments':this['hasComments'],'state':this['state'],'attributes':JSON['stringify'](this['attributes'])};}static['fromJSON'](_0x3042cb){return new AddSuggestionResponse(_0x3042cb['id'],_0x3042cb['authorId'],_0x3042cb['type'],_0x3042cb['createdAt'],_0x3042cb['hasComments'],_0x3042cb['state'],JSON['parse'](_0x3042cb['data']),_0x3042cb['attributes']?JSON['parse'](_0x3042cb['attributes']):null);}}
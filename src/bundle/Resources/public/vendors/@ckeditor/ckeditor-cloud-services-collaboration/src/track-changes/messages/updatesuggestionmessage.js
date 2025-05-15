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
import _0x19abef from'./../../message.js';export default class UpdateSuggestionMessage extends _0x19abef{['id'];['documentId'];['hasComments'];['isHasCommentsModified'];['state'];['attributes'];static ['TYPE']='104';static ['READABLE_TYPE_NAME']='updateSuggestion';static ['DESCRIPTOR_NAME']='TrackChangesUpdateSuggestionMessage';static ['DESCRIPTOR']={'fields':{'id':{'type':'string','id':0x1},'documentId':{'type':'string','id':0x2},'hasComments':{'type':'bool','id':0x3},'isHasCommentsModified':{'type':'bool','id':0x4},'state':{'type':'string','id':0x5},'attributes':{'type':'string','id':0x6}}};constructor(_0x3a73fc,_0x59761b,_0x5b20bf,_0x31d943,_0x2f1a82,_0x120c98=null){super(),this['id']=_0x3a73fc,this['documentId']=_0x59761b,this['hasComments']=_0x5b20bf,this['isHasCommentsModified']=_0x31d943,this['state']=_0x2f1a82,this['attributes']=_0x120c98;}['toJSON'](){return{'id':this['id'],'documentId':this['documentId'],'hasComments':this['hasComments'],'isHasCommentsModified':this['isHasCommentsModified'],'state':this['state'],'attributes':JSON['stringify'](this['attributes'])};}static['fromJSON'](_0x84a895){return new UpdateSuggestionMessage(_0x84a895['id'],_0x84a895['documentId'],_0x84a895['hasComments'],_0x84a895['isHasCommentsModified'],_0x84a895['state'],_0x84a895['attributes']?JSON['parse'](_0x84a895['attributes']):null);}}
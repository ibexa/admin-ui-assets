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
import _0x28271f from'./../../message.js';export default class CollaborativeEditingReconnectMessage extends _0x28271f{['id'];['lastKnowVersion'];['bundleVersion'];static ['TYPE']='12';static ['READABLE_TYPE_NAME']='reconnectToDocument';static ['DESCRIPTOR_NAME']='CollaborativeEditingReconnectMessage';static ['DESCRIPTOR']={'fields':{'id':{'type':'string','id':0x1},'bundleVersion':{'type':'string','id':0x2},'lastKnowVersion':{'type':'uint32','id':0x3}}};constructor(_0x33f799,_0x3ef035,_0x1e86d8){super(),this['id']=_0x33f799,this['lastKnowVersion']=_0x3ef035,this['bundleVersion']=_0x1e86d8;}['toJSON'](){return{'id':this['id'],'bundleVersion':this['bundleVersion'],'lastKnowVersion':this['lastKnowVersion']};}static['fromJSON'](_0x3fc1ae){return new CollaborativeEditingReconnectMessage(_0x3fc1ae['id'],_0x3fc1ae['lastKnowVersion'],_0x3fc1ae['bundleVersion']);}}
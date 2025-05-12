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
import _0x4efda4 from'./../../message.js';export default class CollaborativeEditingConnectMessage extends _0x4efda4{['id'];['buffers'];['types'];['bundleVersion'];['lastOperationId'];static ['TYPE']='11';static ['READABLE_TYPE_NAME']='connectToDocument';static ['DESCRIPTOR_NAME']='CollaborativeEditingConnectMessage';static ['DESCRIPTOR']={'fields':{'id':{'type':'string','id':0x1},'bundleVersion':{'type':'string','id':0x2},'buffers':{'rule':'repeated','type':'bytes','id':0x3},'types':{'rule':'repeated','type':'uint32','id':0x4},'lastOperationId':{'type':'string','id':0x5}}};constructor(_0x3c5bff,_0x406157,_0x49d175,_0x5ac274,_0x557fa4=''){super(),this['id']=_0x3c5bff,this['buffers']=_0x406157,this['types']=_0x49d175,this['bundleVersion']=_0x5ac274,this['lastOperationId']=_0x557fa4;}['toJSON'](){return{'id':this['id'],'buffers':this['buffers'],'types':this['types'],'bundleVersion':this['bundleVersion'],'lastOperationId':this['lastOperationId']};}static['fromJSON'](_0x39c283){return new CollaborativeEditingConnectMessage(_0x39c283['id'],_0x39c283['buffers'],_0x39c283['types'],_0x39c283['bundleVersion'],_0x39c283['lastOperationId']);}}
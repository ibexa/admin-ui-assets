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
import _0x442187 from'./../../message.js';import _0x12a1be from'./../helpers/operationmetadatahelpers.js';import _0x3cec11 from'../descriptors/operationmetadatadescriptor.js';export default class CollaborativeEditingUpdateMessage extends _0x442187{['id'];['buffers'];['types'];['baseVersion'];['metadata'];['lastOperationId'];static ['TYPE']='13';static ['READABLE_TYPE_NAME']='updateDocument';static ['DESCRIPTOR_NAME']='CollaborativeEditingUpdateMessage';static ['DESCRIPTOR']={'fields':{'id':{'type':'string','id':0x1},'baseVersion':{'type':'uint32','id':0x2},'buffers':{'rule':'repeated','type':'bytes','id':0x3},'types':{'rule':'repeated','type':'uint32','id':0x4},'metadata':{'rule':'repeated','type':'OperationMetadataDescriptor','id':0x6},'lastOperationId':{'type':'string','id':0x7}}};constructor(_0x1bbea2,_0x373ea9,_0x219981,_0x2c3799,_0xc42b6=[],_0x2f01b5=''){super(),this['id']=_0x1bbea2,this['buffers']=_0x373ea9,this['types']=_0x219981,this['baseVersion']=_0x2c3799,this['metadata']=_0xc42b6,this['lastOperationId']=_0x2f01b5;}get['data'](){return{'buffers':this['buffers'],'types':this['types'],'baseVersion':this['baseVersion'],'lastOperationId':this['lastOperationId']};}['toJSON'](){return{'id':this['id'],'buffers':this['buffers'],'types':this['types'],'baseVersion':this['baseVersion'],'metadata':_0x12a1be['removeUnnecessaryMetadata'](this['types'],this['metadata'])['map'](_0x3cec11['toJSON']),'lastOperationId':this['lastOperationId']};}static['fromJSON'](_0x224779){return new CollaborativeEditingUpdateMessage(_0x224779['id'],_0x224779['buffers'],_0x224779['types'],_0x224779['baseVersion'],_0x12a1be['prepareMetadataForOperations'](_0x224779['types'],_0x224779['metadata'])['map'](_0x3cec11['fromJSON']),_0x224779['lastOperationId']);}}
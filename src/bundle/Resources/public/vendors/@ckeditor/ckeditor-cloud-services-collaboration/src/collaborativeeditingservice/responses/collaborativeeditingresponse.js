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
import _0x2e77d7 from'./../../message.js';import _0x48a54f from'./../helpers/operationmetadatahelpers.js';import _0x5946e8 from'../descriptors/operationmetadatadescriptor.js';export default class CollaborativeEditingResponse extends _0x2e77d7{['version'];['buffers'];['types'];['metadata'];['lastOperationId'];['lastOperationAcceptedAt'];static ['DESCRIPTOR_NAME']='CollaborativeEditingResponse';static ['DESCRIPTOR']={'fields':{'version':{'type':'uint32','id':0x1},'buffers':{'rule':'repeated','type':'bytes','id':0x2},'types':{'rule':'repeated','type':'uint32','id':0x3},'metadata':{'rule':'repeated','type':'OperationMetadataDescriptor','id':0x5},'lastOperationId':{'type':'string','id':0x6},'lastOperationAcceptedAt':{'type':'string','id':0x7}}};constructor(_0x345a19,_0x3ce788=[],_0x6288f2=[],_0x50ff1b=[],_0x4c3a8a='',_0x48dfc6=null){super(),this['version']=_0x345a19,this['buffers']=_0x3ce788,this['types']=_0x6288f2,this['metadata']=_0x50ff1b,this['lastOperationId']=_0x4c3a8a,this['lastOperationAcceptedAt']=_0x48dfc6;}get['data'](){return{'buffers':this['buffers'],'types':this['types'],'baseVersion':this['version']-this['types']['length'],'lastOperationId':this['lastOperationId'],'lastOperationAcceptedAt':this['lastOperationAcceptedAt']};}get['wereChangesApplied'](){return!this['types']?.['length'];}['toJSON'](){return{'version':this['version'],'buffers':this['buffers'],'types':this['types'],'metadata':_0x48a54f['removeUnnecessaryMetadata'](this['types'],this['metadata'])['map'](_0x5946e8['toJSON']),'lastOperationId':this['lastOperationId'],'lastOperationAcceptedAt':this['lastOperationAcceptedAt']instanceof Date?this['lastOperationAcceptedAt']['toISOString']():this['lastOperationAcceptedAt']};}static['fromJSON'](_0x33dfb5){return new CollaborativeEditingResponse(_0x33dfb5['version'],_0x33dfb5['buffers'],_0x33dfb5['types'],_0x48a54f['prepareMetadataForOperations'](_0x33dfb5['types'],_0x33dfb5['metadata'])['map'](_0x5946e8['fromJSON']),_0x33dfb5['lastOperationId'],_0x33dfb5['lastOperationAcceptedAt']?new Date(_0x33dfb5['lastOperationAcceptedAt']):null);}static['create'](_0x5bc486){return new CollaborativeEditingResponse(_0x5bc486['version'],_0x5bc486['buffers'],_0x5bc486['types'],_0x5bc486['metadata'],_0x5bc486['lastOperationId'],_0x5bc486['lastOperationAcceptedAt']?new Date(_0x5bc486['lastOperationAcceptedAt']):null);}}
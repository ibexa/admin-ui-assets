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
import _0x40f28a from'./../../message.js';import _0x61c142 from'../descriptors/commentsthreaddescriptor.js';export default class GetDocumentThreadsResponse extends _0x40f28a{['_threads'];['_threadsV2'];['threads'];static ['DESCRIPTOR_NAME']='CommentsV2GetDocumentThreadsResponse';static ['DESCRIPTOR']={'fields':{'threads':{'type':'string','rule':'repeated','id':0x1},'threadsV2':{'type':'CommentsThreadDescriptor','rule':'repeated','id':0x2}}};constructor(_0x46c4f9,_0x29e80f){super(),this['_threads']=_0x46c4f9,this['_threadsV2']=_0x29e80f,this['threads']=_0x29e80f?.['length']?_0x29e80f:_0x46c4f9;}['toJSON'](){return{'threads':this['_threads']?.['map'](_0x362d46=>JSON['stringify'](_0x362d46)),'threadsV2':this['_threadsV2']?.['map'](_0x61c142['toJSON'])};}static['fromJSON'](_0x4e9353){return new GetDocumentThreadsResponse(_0x4e9353['threads']?.['map'](_0x494e03=>function(_0x3f9abb){const _0xe91f55=JSON['parse'](_0x3f9abb),_0xb951d4={..._0xe91f55};return _0xe91f55['comments']&&(_0xb951d4['comments']=_0xe91f55['comments']?.['map'](_0x30a592=>({..._0x30a592,'createdAt':new Date(_0x30a592['createdAt'])}))),_0xb951d4;}(_0x494e03)),_0x4e9353['threadsV2']?.['map'](_0x61c142['fromJSON']));}}
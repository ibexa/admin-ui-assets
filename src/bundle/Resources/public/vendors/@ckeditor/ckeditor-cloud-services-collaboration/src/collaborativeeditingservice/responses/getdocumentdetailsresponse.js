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
import _0x3a4695 from'./../../message.js';export default class GetDocumentDetailsResponse extends _0x3a4695{['lastDocumentSession'];['currentDocumentSession'];static ['DESCRIPTOR_NAME']='GetDocumentDetailsResponse';static ['DESCRIPTOR']={'fields':{'lastDocumentSessionId':{'type':'string','id':0x1},'lastDocumentSessionOperationId':{'type':'string','id':0x2},'currentDocumentSessionId':{'type':'string','id':0x3},'currentDocumentSessionVersion':{'type':'uint32','id':0x4},'currentDocumentSessionOperationId':{'type':'string','id':0x5}}};constructor(_0x8c139a,_0x554ef5){super(),this['lastDocumentSession']=_0x8c139a,this['currentDocumentSession']=_0x554ef5;}get['data'](){return{'lastDocumentSessionId':this['lastDocumentSession']?.['id'],'lastDocumentSessionOperationId':this['lastDocumentSession']?.['lastOperationId'],'currentDocumentSessionId':this['currentDocumentSession']?.['id'],'currentDocumentSessionVersion':this['currentDocumentSession']?.['version'],'currentDocumentSessionOperationId':this['currentDocumentSession']?.['lastOperationId']};}['toJSON'](){return{'lastDocumentSessionId':this['lastDocumentSession']?.['id'],'lastDocumentSessionOperationId':this['lastDocumentSession']?.['lastOperationId'],'currentDocumentSessionId':this['currentDocumentSession']?.['id'],'currentDocumentSessionVersion':this['currentDocumentSession']?.['version'],'currentDocumentSessionOperationId':this['currentDocumentSession']?.['lastOperationId']};}static['fromJSON'](_0x5b3741){const _0x13779a=_0x5b3741['lastDocumentSessionId']?{'id':_0x5b3741['lastDocumentSessionId'],'lastOperationId':_0x5b3741['lastDocumentSessionOperationId']}:void 0x0,_0x5949f4=_0x5b3741['currentDocumentSessionId']?{'lastOperationId':_0x5b3741['currentDocumentSessionOperationId'],'version':_0x5b3741['currentDocumentSessionVersion'],'id':_0x5b3741['currentDocumentSessionId']}:void 0x0;return new GetDocumentDetailsResponse(_0x13779a,_0x5949f4);}}
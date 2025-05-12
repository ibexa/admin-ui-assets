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
export default class CKEditorCloudServicesError extends Error{['context'];['code'];['data'];constructor(_0x2a9f13,_0x3bf693,_0x410ebf=null,_0x205e91={}){super('cloud-services-internal-error:\x20'+_0x2a9f13),this['context']=_0x3bf693,this['code']=_0x410ebf,this['data']=_0x205e91,this['name']='CKEditorError';}static['fromPublicError'](_0x5d3cdb){return new CKEditorCloudServicesError(function(_0x7a4cb3){let _0x2e11ac='cloud-services-error:\x20'+_0x7a4cb3['message'];return _0x7a4cb3['data']&&(_0x2e11ac+='\x0aError\x20data:\x20'+JSON['stringify'](_0x7a4cb3['data'])),_0x7a4cb3['explanation']&&(_0x2e11ac+='\x0aExplanation:\x20'+_0x7a4cb3['explanation']),_0x7a4cb3['action']&&(_0x2e11ac+='\x0aAction:\x20'+_0x7a4cb3['action']),_0x7a4cb3['traceId']&&(_0x2e11ac+='\x0aTraceId:\x20'+_0x7a4cb3['traceId']),_0x7a4cb3['code']&&(_0x2e11ac+='\x0aCode:\x20'+_0x7a4cb3['code']),_0x2e11ac;}(_0x5d3cdb),_0x5d3cdb);}}
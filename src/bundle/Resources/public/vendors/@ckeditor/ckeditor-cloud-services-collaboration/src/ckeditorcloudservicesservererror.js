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
export default class CKEditorCloudServicesServerError extends Error{['code'];['traceId'];['data'];constructor(_0x14569d,_0x540d1d){super(),this['name']='CKEditorCloudServicesServerError',this['stack']=void 0x0,this['message']=_0x14569d,this['code']=_0x540d1d['code'],this['traceId']=_0x540d1d['traceId'],this['data']=_0x540d1d['data'];}static['fromPublicError'](_0x2f86e0){return new CKEditorCloudServicesServerError(function(_0x5b4b01){let _0x285f4f='cloud-services-server-error:\x20'+_0x5b4b01['message'];return _0x5b4b01['explanation']&&(_0x285f4f+='\x0aExplanation:\x20'+_0x5b4b01['explanation']),_0x5b4b01['action']&&(_0x285f4f+='\x0aAction:\x20'+_0x5b4b01['action']),_0x5b4b01['traceId']&&(_0x285f4f+='\x0aTraceId:\x20'+_0x5b4b01['traceId']),_0x5b4b01['code']&&(_0x285f4f+='\x0aCode:\x20'+_0x5b4b01['code']),_0x285f4f;}(_0x2f86e0),_0x2f86e0);}}
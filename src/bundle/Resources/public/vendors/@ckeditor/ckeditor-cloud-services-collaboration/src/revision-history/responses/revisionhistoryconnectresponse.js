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
import _0x4f4241 from'./../../message.js';import _0x55500c from'../descriptors/revisiondescriptor.js';export default class RevisionHistoryConnectResponse extends _0x4f4241{['channel'];['requestId'];['revisions'];static ['DESCRIPTOR_NAME']='RevisionHistoryConnectResponse';static ['DESCRIPTOR']={'fields':{'channel':{'type':'string','id':0x1},'requestId':{'type':'uint32','id':0x2},'revisions':{'type':'RevisionDescriptor','id':0x3,'rule':'repeated'}}};constructor(_0xb2d9d1,_0x267f1d,_0x2b6150){super(),this['channel']=_0xb2d9d1,this['requestId']=_0x267f1d,this['revisions']=_0x2b6150;}['toJSON'](){return{'channel':this['channel'],'requestId':this['requestId'],'revisions':this['revisions']['map'](_0x55500c['toJSON'])};}['toObject'](){return{'channel':this['channel'],'requestId':this['requestId'],'revisions':this['revisions']['map'](_0x55500c['toObject'])};}static['fromJSON'](_0x36ca6f){return new RevisionHistoryConnectResponse(_0x36ca6f['channel'],_0x36ca6f['requestId'],_0x36ca6f['revisions']['map'](_0x55500c['fromJSON']));}}
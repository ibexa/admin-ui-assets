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
import _0x29bf80 from'./../../message.js';import _0xe8c6c3 from'../descriptors/revisiondescriptor.js';export default class RevisionHistoryUpdateRevisionsMessage extends _0x29bf80{['documentId'];['requestId'];['revisions'];static ['TYPE']='124';static ['READABLE_TYPE_NAME']='updateRevisions';static ['DESCRIPTOR_NAME']='RevisionHistoryUpdateRevisionsMessage';static ['DESCRIPTOR']={'fields':{'documentId':{'type':'string','id':0x1},'requestId':{'type':'uint32','id':0x2},'revisions':{'type':'RevisionDescriptor','id':0x3,'rule':'repeated'}}};constructor(_0x6b93f5,_0x241b88,_0x3d6000){super(),this['documentId']=_0x6b93f5,this['requestId']=_0x241b88,this['revisions']=_0x3d6000;}['toJSON'](){return{'documentId':this['documentId'],'requestId':this['requestId'],'revisions':this['revisions']['map'](_0xe8c6c3['toJSON'])};}['toObject'](){return{'documentId':this['documentId'],'requestId':this['requestId'],'revisions':this['revisions']['map'](_0xe8c6c3['toObject'])};}static['create'](_0x55e4ea){return new RevisionHistoryUpdateRevisionsMessage(_0x55e4ea['documentId'],_0x55e4ea['requestId'],_0x55e4ea['revisions']['map'](_0xe8c6c3['create']));}static['fromJSON'](_0x385ecb){return new RevisionHistoryUpdateRevisionsMessage(_0x385ecb['documentId'],_0x385ecb['requestId'],_0x385ecb['revisions']['map'](_0xe8c6c3['fromJSON']));}}
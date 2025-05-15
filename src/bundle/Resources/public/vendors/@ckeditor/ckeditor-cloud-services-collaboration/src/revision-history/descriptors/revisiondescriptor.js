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
import _0x9de1de from'./../../descriptor.js';export default class RevisionDescriptor extends _0x9de1de{static ['DESCRIPTOR_NAME']='RevisionDescriptor';static ['DESCRIPTOR']={'fields':{'revisionId':{'type':'string','id':0x1},'name':{'type':'string','id':0x2},'creatorId':{'type':'string','id':0x3},'authorsIds':{'type':'string','id':0x4},'diffData':{'type':'string','id':0x5},'createdAt':{'type':'string','id':0x6},'attributes':{'type':'string','id':0x7},'toVersion':{'type':'uint32','id':0x8},'fromVersion':{'type':'uint32','id':0x9},'isEmptyCurrent':{'type':'bool','id':0xa}}};static['create'](_0x42510c){return{'revisionId':_0x42510c['id'],'name':_0x42510c['name'],'creatorId':_0x42510c['creatorId'],'createdAt':_0x42510c['createdAt'],'fromVersion':_0x42510c['fromVersion'],'toVersion':_0x42510c['toVersion'],'isEmptyCurrent':_0x42510c['isEmptyCurrent'],'diffData':_0x42510c['diffData']?JSON['stringify'](_0x42510c['diffData']):void 0x0,'attributes':_0x42510c['attributes'],'authorsIds':_0x42510c['authorsIds']};}static['toJSON'](_0x3af2bf){return{'revisionId':_0x3af2bf['revisionId'],'name':_0x3af2bf['name'],'creatorId':_0x3af2bf['creatorId'],'authorsIds':_0x3af2bf['authorsIds']?JSON['stringify'](_0x3af2bf['authorsIds']):void 0x0,'diffData':_0x3af2bf['diffData'],'createdAt':_0x3af2bf['createdAt']?.['toISOString'](),'attributes':_0x3af2bf['attributes']?JSON['stringify'](_0x3af2bf['attributes']):void 0x0,'toVersion':_0x3af2bf['toVersion'],'fromVersion':_0x3af2bf['fromVersion'],'isEmptyCurrent':_0x3af2bf['isEmptyCurrent']};}static['fromJSON'](_0x2197a6){return{'revisionId':(_0x2197a6={..._0x2197a6})['revisionId'],'name':_0x2197a6['name'],'creatorId':_0x2197a6['creatorId'],'authorsIds':_0x2197a6['authorsIds']?JSON['parse'](_0x2197a6['authorsIds']):void 0x0,'diffData':_0x2197a6['diffData'],'createdAt':_0x2197a6['createdAt']?new Date(_0x2197a6['createdAt']):void 0x0,'attributes':_0x2197a6['attributes']?JSON['parse'](_0x2197a6['attributes']):void 0x0,'toVersion':_0x2197a6['toVersion'],'fromVersion':_0x2197a6['fromVersion'],'isEmptyCurrent':_0x2197a6['isEmptyCurrent']};}static['toObject'](_0x4e97d7){return function(_0x8ea83d){for(const [_0xa5c5cb,_0xec8e6f]of Object['entries'](_0x8ea83d))void 0x0===_0xec8e6f&&delete _0x8ea83d[_0xa5c5cb];return _0x8ea83d;}({'id':_0x4e97d7['revisionId'],'name':_0x4e97d7['name'],'creatorId':_0x4e97d7['creatorId'],'createdAt':_0x4e97d7['createdAt'],'fromVersion':_0x4e97d7['fromVersion'],'toVersion':_0x4e97d7['toVersion'],'isEmptyCurrent':_0x4e97d7['isEmptyCurrent'],'diffData':_0x4e97d7['diffData']?JSON['parse'](_0x4e97d7['diffData']):void 0x0,'attributes':_0x4e97d7['attributes'],'authorsIds':_0x4e97d7['authorsIds']});}}
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
import _0x51f3dd from'./../../message.js';import _0x17fa57 from'../descriptors/revisiondescriptor.js';export default class RevisionHistoryGetRevisionResponse extends _0x51f3dd{['revisionId'];['name'];['creatorId'];['authorsIds'];['createdAt'];['diffData'];['attributes'];['fromVersion'];['toVersion'];['isEmptyCurrent'];static ['DESCRIPTOR_NAME']='RevisionHistoryGetRevisionResponse';static ['DESCRIPTOR']=((()=>_0x17fa57['DESCRIPTOR'])());constructor(_0x217373,_0x169896,_0x120ad7,_0x1a0e7b,_0xec843,_0x15b1d6,_0x3fb793,_0xa5d81b,_0x51ce6e,_0x59a4ff){super(),this['revisionId']=_0x217373,this['name']=_0x169896,this['creatorId']=_0x120ad7,this['authorsIds']=_0x1a0e7b,this['createdAt']=_0xec843,this['diffData']=_0x15b1d6,this['attributes']=_0x3fb793,this['fromVersion']=_0xa5d81b,this['toVersion']=_0x51ce6e,this['isEmptyCurrent']=_0x59a4ff;}['toJSON'](){return _0x17fa57['toJSON'](this);}['toObject'](){return _0x17fa57['toObject'](this);}static['create'](_0x2ca4af){return new RevisionHistoryGetRevisionResponse(_0x2ca4af['revisionId'],_0x2ca4af['name'],_0x2ca4af['creatorId'],_0x2ca4af['authorsIds'],_0x2ca4af['createdAt'],_0x2ca4af['diffData'],_0x2ca4af['attributes'],_0x2ca4af['fromVersion'],_0x2ca4af['toVersion'],_0x2ca4af['isEmptyCurrent']);}static['fromJSON'](_0x53fab3){return new RevisionHistoryGetRevisionResponse(_0x53fab3['revisionId'],_0x53fab3['name'],_0x53fab3['creatorId'],_0x53fab3['authorsIds']?JSON['parse'](_0x53fab3['authorsIds']):void 0x0,_0x53fab3['createdAt']?new Date(_0x53fab3['createdAt']):void 0x0,_0x53fab3['diffData'],_0x53fab3['attributes']?JSON['parse'](_0x53fab3['attributes']):void 0x0,_0x53fab3['fromVersion'],_0x53fab3['toVersion'],_0x53fab3['isEmptyCurrent']);}}
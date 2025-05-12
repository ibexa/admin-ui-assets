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
import _0x3c9240 from'./../../message.js';export default class BatchUpdateSuggestionsStateMessage extends _0x3c9240{['ids'];['documentId'];['state'];static ['TYPE']='106';static ['READABLE_TYPE_NAME']='batchUpdateSuggestionsState';static ['DESCRIPTOR_NAME']='TrackChangesBatchUpdateSuggestionsStateMessage';static ['DESCRIPTOR']={'fields':{'ids':{'type':'string','rule':'repeated','id':0x1},'documentId':{'type':'string','id':0x2},'state':{'type':'string','id':0x3}}};constructor(_0x32d764,_0x73c393,_0x4e7681){super(),this['ids']=_0x32d764,this['documentId']=_0x73c393,this['state']=_0x4e7681;}['toJSON'](){return{'ids':this['ids'],'documentId':this['documentId'],'state':this['state']};}static['fromJSON'](_0x217173){return new BatchUpdateSuggestionsStateMessage(_0x217173['ids'],_0x217173['documentId'],_0x217173['state']);}}
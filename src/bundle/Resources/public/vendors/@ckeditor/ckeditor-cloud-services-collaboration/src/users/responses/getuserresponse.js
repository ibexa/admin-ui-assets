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
import _0x1e7315 from'./../../message.js';export default class GetUserResponse extends _0x1e7315{['attributes'];static ['DESCRIPTOR_NAME']='GetUserResponse';static ['DESCRIPTOR']={'fields':{'attributes':{'rule':'repeated','type':'KeyValueDescriptor','id':0x1}}};constructor(_0x4e6749){super(),this['attributes']=_0x4e6749;}['toJSON'](){return{'attributes':Object['keys'](this['attributes'])['map'](_0x4f032e=>({'key':_0x4f032e,'value':JSON['stringify'](this['attributes'][_0x4f032e])}))};}static['fromJSON'](_0x34eb4c){const _0x27f5be=_0x34eb4c['attributes']['reduce']((_0x1409e2,_0x5d6acd)=>(_0x1409e2[_0x5d6acd['key']]=_0x5d6acd['value']?JSON['parse'](_0x5d6acd['value']):null,_0x1409e2),{});return new GetUserResponse(_0x27f5be);}}
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
import _0x421eb6 from'./../../message.js';export default class GetUserMessage extends _0x421eb6{['id'];static ['TYPE']='21';static ['READABLE_TYPE_NAME']='getUser';static ['DESCRIPTOR_NAME']='GetUserMessage';static ['DESCRIPTOR']={'fields':{'id':{'type':'string','id':0x1}}};constructor(_0x4eeaed){super(),this['id']=_0x4eeaed;}['toJSON'](){return{'id':this['id']};}static['fromJSON'](_0x4e6c3d){return new GetUserMessage(_0x4e6c3d['id']);}}
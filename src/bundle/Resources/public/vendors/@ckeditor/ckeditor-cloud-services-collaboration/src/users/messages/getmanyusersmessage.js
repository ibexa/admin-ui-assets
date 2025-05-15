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
import _0xd02ffa from'./../../message.js';export default class GetManyUsersMessage extends _0xd02ffa{['ids'];static ['TYPE']='22';static ['READABLE_TYPE_NAME']='getManyUsers';static ['DESCRIPTOR_NAME']='GetManyUsersMessage';static ['DESCRIPTOR']={'fields':{'ids':{'id':0x1,'type':'string','rule':'repeated'}}};constructor(_0x92fcc1){super(),this['ids']=_0x92fcc1;}['toJSON'](){return{'ids':this['ids']};}static['fromJSON'](_0x411b0d){return new GetManyUsersMessage(_0x411b0d['ids']);}}
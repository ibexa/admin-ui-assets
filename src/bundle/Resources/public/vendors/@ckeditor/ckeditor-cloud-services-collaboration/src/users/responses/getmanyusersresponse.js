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
import _0x25fd24 from'./../../message.js';export default class GetManyUsersResponse extends _0x25fd24{['users'];static ['DESCRIPTOR_NAME']='GetManyUsersResponse';static ['DESCRIPTOR']={'fields':{'users':{'rule':'repeated','type':'UserDescriptor','id':0x1}}};constructor(_0x803c2a){super(),this['users']=_0x803c2a;}['toJSON'](){return{'users':this['users']['map'](_userToJson)};}static['fromJSON'](_0x308d28){return new GetManyUsersResponse(_0x308d28['users']['map'](_userFromJson));}}function _userToJson(_0x3fc9dd){return{'attributes':Object['keys'](_0x3fc9dd)['map'](_0x37c19e=>({'key':_0x37c19e,'value':JSON['stringify'](_0x3fc9dd[_0x37c19e])}))};}function _userFromJson(_0x36a2b7){return _0x36a2b7['attributes']['reduce']((_0x31aa3f,_0x15ed5e)=>(_0x31aa3f[_0x15ed5e['key']]=_0x15ed5e['value']?JSON['parse'](_0x15ed5e['value']):null,_0x31aa3f),{});}
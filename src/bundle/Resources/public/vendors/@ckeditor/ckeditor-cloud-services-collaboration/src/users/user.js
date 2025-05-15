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
import _0x5c7304 from'./messages/getusermessage.js';import _0x342285 from'./responses/getuserresponse.js';import _0x32bd48 from'./../messagescompressor.js';import _0x34e2c3 from'./messages/getmanyusersmessage.js';import _0x44a7b9 from'./responses/getmanyusersresponse.js';class User{static ['_SERVICE']=0x2;constructor(_0x25aa37={}){this['_attributes']=new Map();for(const _0x159ffb of Object['keys'](_0x25aa37))'id'!==_0x159ffb?(this['_attributes']['set'](_0x159ffb,_0x25aa37[_0x159ffb]),Object['defineProperty'](this,_0x159ffb,{'enumerable':!0x0,'configurable':!0x1,'get':()=>this['_attributes']['get'](_0x159ffb)})):this['id']=_0x25aa37['id'];}static['fromData'](_0x20bb4a){return new User(_0x20bb4a);}static async['get'](_0x2c95d0,_0x1893c4){const _0x3ecb1b=new _0x5c7304(_0x1893c4);try{const _0x4e2f48=await _0x2c95d0['_sendRequest'](User['_SERVICE'],_0x5c7304['TYPE'],_0x32bd48['encode'](_0x3ecb1b)),_0x6f4c1d=_0x32bd48['decode'](_0x4e2f48,_0x342285);return new User(_0x6f4c1d['attributes']);}catch(_0x2d8036){return new User({'id':_0x1893c4});}}static async['getMany'](_0x2fa268,_0x25aba8){const _0x5e356e=new _0x34e2c3(_0x25aba8);try{const _0x15550b=await _0x2fa268['_sendRequest'](User['_SERVICE'],_0x34e2c3['TYPE'],_0x32bd48['encode'](_0x5e356e));return _0x32bd48['decode'](_0x15550b,_0x44a7b9)['users']['map'](_0x2179c6=>new User(_0x2179c6));}catch(_0x5f43d8){return _0x25aba8['map'](_0x2957eb=>new User({'id':_0x2957eb}));}}}export default User;
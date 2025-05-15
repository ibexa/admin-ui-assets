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
import{EmitterMixin}from'ckeditor5/src/utils.js';import _0x46580c from'./../messagescompressor.js';import{WEB_SOCKET_GATEWAY_STATES}from'../websocketgateway/websocketgateway.js';import _0xfef91 from'./messages/iseditorbundleuploadedmessage.js';import _0x198c42 from'./responses/iseditorbundleuploadedresponse.js';import _0x2e79bd from'../ckeditorcloudserviceserror.js';export const _SERVICE=0xd;class EditorService extends/* #__PURE__ -- @preserve */
EmitterMixin(){static ['_SERVICE']=0xd;static async['isBundleUploaded'](_0x49f984,_0x393061){const _0x42d0fa=new _0xfef91(_0x393061);if(_0x49f984['state']!==WEB_SOCKET_GATEWAY_STATES['CONNECTED'])throw new _0x2e79bd('WebSocket\x20Gateway\x20is\x20not\x20connected.',_0x49f984);const _0x567352=await _0x49f984['_sendRequest'](EditorService['_SERVICE'],_0xfef91['TYPE'],_0x46580c['encode'](_0x42d0fa));return _0x46580c['decode'](_0x567352,_0x198c42)['isUploaded'];}}export default EditorService;
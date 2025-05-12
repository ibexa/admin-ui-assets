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
import{EmitterMixin}from'ckeditor5/src/utils.js';import _0x522ee6 from'./../websocketgateway/messages/channelmessage.js';import _0x27bee5 from'./../messagescompressor.js';export default class extends/* #__PURE__ -- @preserve */
EmitterMixin(){['_channelName'];['_wsGateway'];['_socket'];constructor(_0x50af6d,_0xe623f6,_0x2b95cb){super(),this['_channelName']=_0x50af6d,this['_wsGateway']=_0xe623f6,this['_socket']=_0x2b95cb,this['_subscribeToChannel']();}['remove'](){this['_socket']['off'](this['_channelName']);}['getEventName'](_0xbc989b,_0x2ebc2a=!0x1){let _0x67de12='';return _0x2ebc2a&&(_0x67de12+='all:'),_0x67de12+='event',_0xbc989b&&(_0x67de12+=':'+_0xbc989b),_0x67de12;}['_subscribeToChannel'](){this['_socket']['on'](this['_channelName'],_0x48b2da=>{const _0x3c7163=_0x27bee5['decode'](_0x48b2da,_0x522ee6);this['fire'](this['getEventName'](_0x3c7163['type'],!0x0),_0x3c7163['data'],_0x3c7163['socketId']),_0x3c7163['socketId']!==this['_wsGateway']['socketId']&&this['fire'](this['getEventName'](_0x3c7163['type']),_0x3c7163['data'],_0x3c7163['socketId']);});}}
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
import _0x72bafe from'./packets/packetmessage.js';import _0x988f6 from'./../../messagescompressor.js';export default class PacketParser{['encode'](_0x47dffb,_0x431111,_0x5de26e,_0x598a6e='/',_0x440641={}){if(_0x431111['length']>0x2)throw new Error('PacketParser\x20supports\x20only\x202\x20elements\x20in\x20data');const _0x1ae89f={'type':_0x47dffb,'data':_0x431111,'id':_0x5de26e,'nsp':_0x598a6e};return _0x988f6['encode'](_0x72bafe['create'](_0x1ae89f,_0x440641));}['decode'](_0x844716){const _0x1c1566=_0x988f6['decode'](_0x844716,_0x72bafe);return{'packet':{'id':_0x1c1566['id'],'type':_0x1c1566['type'],'data':_0x1c1566['packetData'],'nsp':_0x1c1566['nsp']},'options':{'flags':_0x1c1566['options']['flags'],'rooms':_0x1c1566['options']['rooms'],'except':_0x1c1566['options']['except']}};}}
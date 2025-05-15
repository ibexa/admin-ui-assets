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
import _0x2726a2 from'./../../../messagescompressor.js';import _0x21b00e from'./../../../message.js';import _0x41b4e1 from'./packetoptionsmessage.js';import _0x10a99f from'./../parserutils.js';import _0x125f4f from'./numberbytespacketdatamessage.js';import _0x5efe29 from'./stringbytespacketdatamessage.js';import _0x2872ef from'./bytesbytespacketdatamessage.js';import _0x3e38c3 from'./stringobjectpacketdatamessage.js';import _0x3f1b3b from'./numberobjectpacketdatamessage.js';import _0x2bcd16 from'./objectobjectpacketdatamessage.js';import _0x61c679 from'./objectbufferpacketdatamessage.js';import _0x1464c6 from'./stringstringpacketdatamessage.js';import _0x4b1892 from'./stringnumberpacketdatamessage.js';import _0x183da9 from'./numbernumberpacketdatamessag.js';import _0x4546c5 from'./numberstringpacketdatamessag.js';const PACKET_DATA_MESSAGES=/* #__PURE__ -- @preserve */
((()=>[_0x125f4f,_0x5efe29,_0x2872ef,_0x3e38c3,_0x3f1b3b,_0x2bcd16,_0x61c679,_0x1464c6,_0x4b1892,_0x183da9,_0x4546c5]['reduce']((_0x5cd4fc,_0x2997d0)=>(_0x5cd4fc[_0x2997d0['TYPE']]=_0x2997d0,_0x5cd4fc),{}))());export default class PacketMessage extends _0x21b00e{['type'];['data'];['id'];['nsp'];['options'];static ['TYPE']=0xa;static ['DESCRIPTOR_NAME']='PacketMessage';static ['DESCRIPTOR']={'fields':{'type':{'type':'uint32','id':0x1},'id':{'type':'uint32','id':0x2},'nsp':{'type':'string','id':0x3},'data':{'type':'bytes','id':0x4},'options':{'type':'bytes','id':0x5}}};constructor(_0x3a3c2e,_0x57c329,_0x1f0eb4,_0xbc37f7='/',_0x20ffbc){super(),this['type']=_0x3a3c2e,this['data']=_0x57c329,this['id']=_0x1f0eb4,this['nsp']=_0xbc37f7,this['options']=_0x20ffbc??new _0x41b4e1();}get['packetData'](){return void 0x0===this['data']['data']&&void 0x0===this['data']['data1']?[]:this['data']['data']&&void 0x0===this['data']['data1']?[this['data']['data']]:[this['data']['data'],this['data']['data1']];}['toJSON'](){const _0x1d726a=_0x2726a2['encode'](this['options']),_0x3577f6=_0x2726a2['encode'](this['data']);return{'type':this['type']+0xa*this['data']['constructor']['TYPE'],'id':this['id'],'nsp':'/'===this['nsp']?void 0x0:this['nsp'],'data':_0x3577f6,'options':_0x1d726a};}static['fromJSON'](_0x19d38d){const _0x4c07be=Math['floor'](_0x19d38d['type']/0xa);return new PacketMessage(_0x19d38d['type']-0xa*_0x4c07be,_0x2726a2['decode'](_0x19d38d['data'],PACKET_DATA_MESSAGES[_0x4c07be]),_0x19d38d['id'],_0x19d38d['nsp'],_0x19d38d['options']?_0x2726a2['decode'](_0x19d38d['options'],_0x41b4e1):new _0x41b4e1());}static['create'](_0x7edbc9,_0x1aa611={}){const _0x514cd5=_0x10a99f['getPacketType'](_0x10a99f['getType'](_0x7edbc9['data'][0x0]),_0x10a99f['getType'](_0x7edbc9['data'][0x1]??_0x7edbc9['data'][0x0]));return new PacketMessage(_0x7edbc9['type'],PACKET_DATA_MESSAGES[_0x514cd5]['create'](_0x7edbc9['data'][0x0],_0x7edbc9['data'][0x1]),_0x7edbc9['id'],_0x7edbc9['nsp'],new _0x41b4e1(_0x1aa611['flags'],_0x1aa611['rooms'],_0x1aa611['except']));}}
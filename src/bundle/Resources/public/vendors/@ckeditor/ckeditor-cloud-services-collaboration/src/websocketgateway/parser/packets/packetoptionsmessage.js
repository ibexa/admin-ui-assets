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
import _0x2da591 from'./../../../message.js';export default class PacketOptionsMessage extends _0x2da591{['flags'];['rooms'];['except'];static ['TYPE']=0xb;static ['DESCRIPTOR_NAME']='PacketOptionsMessage';static ['DESCRIPTOR']={'fields':{'flags':{'type':'string','id':0x1},'rooms':{'type':'string','id':0x2,'rule':'repeated'},'except':{'type':'string','id':0x3,'rule':'repeated'}}};constructor(_0x27c0e3,_0xebb84a=[],_0x2e85be=[]){super(),this['flags']=_0x27c0e3,this['rooms']=_0xebb84a,this['except']=_0x2e85be;}['toJSON'](){return{'flags':this['flags']?JSON['stringify'](this['flags']):void 0x0,'rooms':this['rooms']?.['length']?this['rooms']:void 0x0,'except':this['except']?.['length']?this['except']:void 0x0};}static['fromJSON'](_0x41afde){return new PacketOptionsMessage(_0x41afde['flags']&&JSON['parse'](_0x41afde['flags']),_0x41afde['rooms'],_0x41afde['except']);}}
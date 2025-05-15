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
import _0x218835 from'./../../message.js';export default class SocketConnectMessage extends _0x218835{['id'];['userId'];['role'];['permissions'];static ['TYPE']='32';static ['READABLE_TYPE_NAME']='connectSocket';static ['DESCRIPTOR_NAME']='SocketConnectMessage';static ['DESCRIPTOR']={'fields':{'id':{'type':'string','id':0x1},'userId':{'type':'string','id':0x2},'role':{'type':'string','id':0x3},'permissions':{'rule':'repeated','type':'string','id':0x4}}};constructor(_0x1ff559,_0x450568,_0x24a505,_0x377f4f){super(),this['id']=_0x1ff559,this['userId']=_0x450568,this['role']=_0x24a505,this['permissions']=_0x377f4f;}['toJSON'](){return{'id':this['id'],'userId':this['userId']??void 0x0,'role':this['role']??void 0x0,'permissions':this['permissions']??void 0x0};}static['fromJSON'](_0x1017cb){return new SocketConnectMessage(_0x1017cb['id'],_0x1017cb['userId'],_0x1017cb['role'],_0x1017cb['permissions']);}}
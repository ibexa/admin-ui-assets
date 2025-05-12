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
import _0xf84000 from'./../../message.js';export default class SessionsConnectResponse extends _0xf84000{['channel'];['sockets'];static ['DESCRIPTOR_NAME']='SessionsConnectResponse';static ['DESCRIPTOR']={'fields':{'channel':{'type':'string','id':0x1},'sockets':{'rule':'repeated','type':'SessionsSocketDescriptor','id':0x2}}};constructor(_0x45f1d6,_0x544441=[]){super(),this['channel']=_0x45f1d6,this['sockets']=_0x544441;}['toJSON'](){return{'channel':this['channel'],'sockets':this['sockets']['map'](_0x5eb183=>({'user':_0x5eb183['userId'],'session':_0x5eb183['id'],'role':_0x5eb183['role'],'permissions':_0x5eb183['permissions']}))};}static['fromJSON'](_0x36cc34){return new SessionsConnectResponse(_0x36cc34['channel'],_0x36cc34['sockets']['map'](_0x3d561e=>({'id':_0x3d561e['session'],'userId':_0x3d561e['user'],'role':_0x3d561e['role'],'permissions':_0x3d561e['permissions']})));}}
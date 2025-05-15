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
import _0x5906a5 from'./../../message.js';import _0x4f1139 from'../descriptors/commentsthreaddescriptor.js';export default class ConnectResponse extends _0x5906a5{['channel'];['_threads'];['_threadsV2'];['threads'];static ['DESCRIPTOR_NAME']='CommentsV2ConnectResponse';static ['DESCRIPTOR']={'fields':{'channel':{'type':'string','id':0x1},'threads':{'type':'string','rule':'repeated','id':0x2},'threadsV2':{'type':'CommentsThreadDescriptor','rule':'repeated','id':0x3}}};constructor(_0x5df3ab,_0x5cada1,_0xe5f4d9){super(),this['channel']=_0x5df3ab,this['_threads']=_0x5cada1,this['_threadsV2']=_0xe5f4d9,this['threads']=_0xe5f4d9?.['length']?_0xe5f4d9:_0x5cada1;}['toJSON'](){return{'channel':this['channel'],'threads':this['_threads']?.['map'](_0x227309=>JSON['stringify'](_0x227309)),'threadsV2':this['_threadsV2']?.['map'](_0x4f1139['toJSON'])};}static['fromJSON'](_0x2d5608){return new ConnectResponse(_0x2d5608['channel'],_0x2d5608['threads']?.['map'](_0x454fdc=>JSON['parse'](_0x454fdc)),_0x2d5608['threadsV2']?.['map'](_0x4f1139['fromJSON']));}}
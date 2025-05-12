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
import _0xdbc6d9 from'../ckeditorcloudserviceserror.js';class WebSocketRequest{['_context'];['_deferredPromise']=(function(){let resolve,reject;const promise=new Promise((promiseResolve,promiseReject)=>{resolve=promiseResolve,reject=promiseReject;});return{'resolve':resolve,'reject':reject,'promise':promise};}());['timeout'];constructor(_0x5aa2ac,_0x50749a){this['_context']=_0x5aa2ac,this['timeout']=setTimeout(()=>this['error'](new _0xdbc6d9('Request\x20timeout.',this['_context'])),_0x50749a);}get['promise'](){return this['_deferredPromise']['promise'];}['response'](_0x2e3c59){this['_deferredPromise']['resolve'](_0x2e3c59);}['error'](_0x554abb){this['_deferredPromise']['reject'](_0x554abb);}}export default class WebSocketGatewayRequestsManager{['_context'];['_requests']=new Set();constructor(_0xc57526){this['_context']=_0xc57526;}async['send'](_0x50b0d7,_0x2a746f=0xafc8){const _0x11241d=this['_createRequest'](_0x2a746f);try{return _0x50b0d7(_0x11241d),await _0x11241d['promise'];}finally{this['_finishRequest'](_0x11241d);}}['errorAll'](_0x17ea09){for(const _0x1d2633 of this['_requests'])_0x1d2633['error'](_0x17ea09);}['waitForAllRequests'](_0x37897d=0xafc8){return this['_waitForRequests'](_0x37897d);}['_createRequest'](_0x24374e){const _0xbb085f=new WebSocketRequest(this['_context'],_0x24374e);return this['_requests']['add'](_0xbb085f),_0xbb085f;}['_finishRequest'](_0x579e71){this['_requests']['delete'](_0x579e71),clearTimeout(_0x579e71['timeout']);}async['_waitForRequests'](_0x55fbad=0x1388,_0x316f27=0x0){return!this['_requests']['size']||_0x316f27>=_0x55fbad/0x1f4?Promise['resolve']():(await new Promise(_0x236a3b=>{setTimeout(_0x236a3b,0x1f4);}),this['_waitForRequests'](_0x55fbad,_0x316f27++));}}
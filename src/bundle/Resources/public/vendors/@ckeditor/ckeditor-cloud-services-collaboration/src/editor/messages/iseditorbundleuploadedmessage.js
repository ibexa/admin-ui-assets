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
import _0x36cf91 from'./../../message.js';export default class IsEditorBundleUploadedMessage extends _0x36cf91{['bundleVersion'];static ['TYPE']='131';static ['READABLE_TYPE_NAME']='isEditorBundleUploaded';static ['DESCRIPTOR_NAME']='IsEditorBundleUploadedMessage';static ['DESCRIPTOR']={'fields':{'bundleVersion':{'type':'string','id':0x1}}};constructor(_0x10b627){super(),this['bundleVersion']=_0x10b627;}['toJSON'](){return{'bundleVersion':this['bundleVersion']};}static['fromJSON'](_0x1a2225){return new IsEditorBundleUploadedMessage(_0x1a2225['bundleVersion']);}}
/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
export { default as Permissions } from './permissions.js';
export { default as Users, type User } from './users.js';
export { default as UserView } from './users/view/userview.js';
export { default as AriaDescriptionView } from './suggestions/view/ariadescriptionview.js';
export { LateFocusButtonView, LateFocusDropdownButtonView } from './suggestions/view/latefocusbuttonview.js';
export { default as getDateTimeFormatter } from './utils/getdatetimeformatter.js';
export { default as getMarkerDomElement, getAllMarkersDomElementsSorted } from './utils/getmarkerdomelement.js';
export { default as trimHtml } from './utils/trim-html.js';
export { default as ConfirmMixin, type RemoveConfirmEvent } from './utils/confirmmixin.js';
export { default as hashObject } from './utils/hashobject.js';
export { default as sanitizeEditorConfig } from './utils/sanitizeEditorConfig.js';
export { default as surroundingMarkersDetector } from './utils/surroundingmarkersdetector.js';
export { default as setupThreadKeyboardNavigation, FOCUS_ANNOTATION_KEYSTROKE, type ThreadEscapeEvent, type ThreadArrowUpEvent, type ThreadArrowDownEvent } from './utils/setupthreadkeyboardnavigation.js';
export type { default as CollaborationOperation, InsertCollaborationOperation, SplitCollaborationOperation, MarkerCollaborationOperation, MoveCollaborationOperation, MergeCollaborationOperation, RootCollaborationOperation, RootAttributeCollaborationOperation } from './collaborationoperation.js';
export type { default as CollaborationHistory } from './collaborationhistory.js';
export type { LocaleConfig, RealTimeCollaborationConfig } from './config.js';
export * from './suggestionstyles.js';
import './augmentation.js';

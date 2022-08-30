// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

'use strict';

import {ipcRenderer, contextBridge} from 'electron';

import {
    CLOSE_DOWNLOADS_DROPDOWN,
    DOWNLOADS_DROPDOWN_FOCUSED,
    DOWNLOADS_DROPDOWN_OPEN_FILE,
    GET_LANGUAGE_INFORMATION,
    OPEN_DOWNLOADS_DROPDOWN,
    REQUEST_CLEAR_DOWNLOADS_DROPDOWN,
    REQUEST_DOWNLOADS_DROPDOWN_INFO,
    RETRIEVED_LANGUAGE_INFORMATION,
    UPDATE_DOWNLOADS_DROPDOWN,
} from 'common/communication';

console.log('preloaded for the downloadsDropdown!');

contextBridge.exposeInMainWorld('process', {
    platform: process.platform,
});

window.addEventListener('mousemove', () => {
    ipcRenderer.send(DOWNLOADS_DROPDOWN_FOCUSED);
});

/**
 * renderer => main
 */
window.addEventListener('message', async (event) => {
    switch (event.data.type) {
    case CLOSE_DOWNLOADS_DROPDOWN:
        ipcRenderer.send(CLOSE_DOWNLOADS_DROPDOWN);
        break;
    case OPEN_DOWNLOADS_DROPDOWN:
        ipcRenderer.send(OPEN_DOWNLOADS_DROPDOWN);
        break;
    case REQUEST_DOWNLOADS_DROPDOWN_INFO:
        ipcRenderer.send(REQUEST_DOWNLOADS_DROPDOWN_INFO);
        break;
    case REQUEST_CLEAR_DOWNLOADS_DROPDOWN:
        ipcRenderer.send(REQUEST_CLEAR_DOWNLOADS_DROPDOWN);
        break;
    case DOWNLOADS_DROPDOWN_OPEN_FILE:
        ipcRenderer.send(DOWNLOADS_DROPDOWN_OPEN_FILE, event.data.payload.item);
        break;
    case GET_LANGUAGE_INFORMATION:
        window.postMessage({type: RETRIEVED_LANGUAGE_INFORMATION, data: await ipcRenderer.invoke(GET_LANGUAGE_INFORMATION)});
        break;
    default:
        console.log('Got an unknown message. Unknown messages are ignored');
    }
});

/**
 * main => renderer
 */
ipcRenderer.on(UPDATE_DOWNLOADS_DROPDOWN, (event, downloads, darkMode, windowBounds) => {
    window.postMessage({type: UPDATE_DOWNLOADS_DROPDOWN, data: {downloads, darkMode, windowBounds}}, window.location.href);
});
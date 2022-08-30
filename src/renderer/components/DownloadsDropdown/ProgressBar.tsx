// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {DownloadedItem} from 'types/config';

type OwnProps = {
    item: DownloadedItem;
}

const ProgressBar = ({item}: OwnProps) => {
    if (item.state !== 'progressing') {
        return null;
    }

    return (
        <div className='DownloadsDropdown__File__ProgressBarContainer'>
            <div
                className='DownloadsDropdown__File__ProgressBar'
                style={{width: `${item.progress}%`}}
            />
        </div>
    );
};

export default ProgressBar;
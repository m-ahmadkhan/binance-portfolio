import React from 'react';
import { Text } from 'react-native';

import { Status } from 'constants/index'

const StatusControl = ({ statusData, styles }: { statusData: { status?: string; message?: string }; styles?: Object }) => {
    const textColor = {
        [Status.ERROR]: 'red',
        [Status.SUCCESS]: 'green',
        [Status.MESSAGE]: 'black',
    };

    if (statusData?.status && statusData?.status !== Status.INIT && statusData?.message) {
        return (
            <Text style={{ color: textColor[statusData?.status], fontSize: 12, ...styles }}>
                {statusData?.message}
            </Text>
        );
    }
    return null;
};

export default StatusControl;

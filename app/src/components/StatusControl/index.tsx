import React from 'react';
import { Text } from 'react-native';
import { Status } from './constants'

const StatusControl = ({ statusData, styles }: { statusData: { status?: string; message?: string }; styles?: Object }) => {
    if (statusData?.status === Status.ERROR && statusData?.message)
        return <Text style={{ color: 'red', fontSize: 12, ...styles }}>{statusData?.message}</Text>
    else if (statusData?.status === Status.SUCCESS && statusData?.message)
        return <Text style={{ color: 'green', fontSize: 12, ...styles }}>{statusData?.message}</Text>

    return null;
};

export default StatusControl;
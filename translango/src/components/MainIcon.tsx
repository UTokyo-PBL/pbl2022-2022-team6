import { Avatar } from '@mui/material';
import React, { Component } from 'react';
import TranslanGoIcon from '../Assets/TranslanGoIcon.svg';

export default class MainIcon extends Component<{ background: string }, {}> {

    constructor(props: any) {
        super(props);

    }

    render() {
        const background = this.props.background;
        const avatarStyle = {
            bgcolor: background,
            m: 2,
        };
        return (
            <Avatar variant="square" sx={avatarStyle} sizes="(max-height: 100%)">
                <img src={TranslanGoIcon} height="100%" />
            </Avatar>
        )

    }

}
import { Avatar, SvgIcon } from '@mui/material';
import React, { Component } from 'react';
import TranslanGoIconWhite from '../Assets/TranslanGoIconWhite.svg';
import TranslanGoIconDark from '../Assets/TranslanGoIconDark.svg';


export default class MainIconSolid extends Component<{ darklogo: boolean }, {}> {

    constructor(props: any) {
        super(props);

    }

    render() {
        const darklogo = this.props.darklogo;
        const icon = this.props.darklogo === true ? TranslanGoIconDark : TranslanGoIconWhite;
        const avatarStyle = {
            bgcolor: 'transparent',
            width: 24,
            height: 24,
            m: 1,
        };

        return (
            <Avatar variant="rounded" sx={avatarStyle} sizes="(max-height: 40%)">
                <img src={icon} height="100%" />
            </Avatar>
        )

    }

}
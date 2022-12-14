import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { RWebShare } from "react-web-share";
import ShareIcon from '@mui/icons-material/Share';


const ShareButton = (props: any) => {
    return (
        <div>
            <RWebShare
                data={{
                    text: "Look at this translation!",
                    url: window.location.href,
                    title: "Share this " + props.title,
                }}
                onClick={() => console.log("shared successfully!")}
            >
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </RWebShare>
        </div>
    );
};

export default ShareButton;

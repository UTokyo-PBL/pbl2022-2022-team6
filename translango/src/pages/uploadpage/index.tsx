import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

export interface uploadProps {

}

export interface uploadStates {
    webcamRef: any
}
export const UploadImage = () => {


    const videoConstraints = {
        facingMode: { exact: "user" }
    };

    const webcamRef = useRef<Webcam>(null);
    const [url, setUrl] = useState<string | null>(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setUrl(imageSrc);
        }
    }, [webcamRef]);
    return (
        <>
            {/* <Webcam
                audio={false}
                // height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                // width={1280}
                videoConstraints={videoConstraints}
            /> */}
            <input type="file" accept="image/*" capture="environment" />
            <button onClick={capture}>Capture photo</button>
        </>
    );
}


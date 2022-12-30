import { Button } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Navigate } from "react-router-dom";
import { useContext, useState } from 'react';
import AppCtx, { AppCtxUpdater, TRANSLATION_KEYS } from '../store/app-state-context';


export interface UploadImageProps {
    user?: any;
    uid?: string;
    background: string;
}

export interface UploadImageState {
    imgurl: string;
    img: any;
    uploadedimg: boolean;
    height: number;
    width: number;
    rawurl: string;
    location: any;
    check: boolean;
    coordinates: any;
    setLocation: boolean;
    posted: boolean;
}

//Component<UploadImageProps, UploadImageState>

const CameraButton: React.FC<UploadImageProps> = ({user, uid, background}) => {
    const ctx = useContext(AppCtx);
    const ctxUpdater = useContext(AppCtxUpdater);
    const t = (key: TRANSLATION_KEYS) => ctx.translations[ctx.nativeLanguage] ? ctx.translations[ctx.nativeLanguage][key] : ctx.translations['en'][key];

    const [state, setState] = useState<UploadImageState>({
        imgurl: '',
        img: {},
        uploadedimg: false,
        height: 0,
        width: 0,
        rawurl: 'https://wallpapercave.com/wp/wp3597484.jpg',
        location: {},
        check: false,
        coordinates: {},
        setLocation: false,
        posted: false,
    });


    const changeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files[0]) return;
        // event.persist();
        const file = event.target.files[0];
        setState(oldState => {return { ...oldState, img: file, rawurl: URL.createObjectURL(file), uploadedimg: true };});

        await new Promise<void>((resolve, reject) => {
            console.log('async', state.rawurl)
            resolve();
        })
        console.log(state.rawurl)
    };
        const cameraStyle = {
            bgcolor: background,
            m: 2,
            color: 'secondary',
            flexDirection: 'column',
            maxWidth: '100%',
            fullWidth: 'true',
            borderRadius: 4,
            "& .MuiButton-startIcon": { margin: 0 }
        };





        return (
            <>
                {state.uploadedimg && (
                    <Navigate to="/view-image" replace={true} state={state} />
                )}
                    <Button variant='text' color="secondary" aria-label="Camera" sx={cameraStyle} component='label'>
                        <input hidden type="file" accept="image/*" onChange={changeImage} />
                        <CameraAltIcon color="secondary" sx={{ fontSize: 100 }} />
                        <span>{t('CAMERA')}</span>
                    </Button>
            </>
        )

    }

export default CameraButton;


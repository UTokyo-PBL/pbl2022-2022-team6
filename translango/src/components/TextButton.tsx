import { Button, SvgIcon, SvgIconProps } from '@mui/material';
import { useContext } from 'react';
import AppCtx, { TRANSLATION_KEYS } from '../store/app-state-context';



function TextRecIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props} viewBox="0 0 100 100">
            <path d="M8.16667 16.3334C8.16667 11.8417 11.8417 8.16675 16.3333 8.16675H32.6667V16.3334H16.3333V32.6667H8.16667V16.3334ZM89.8333 81.6667C89.8333 86.1992 86.1992 89.8334 81.6667 89.8334H65.3333V81.6667H81.6667V65.3334H89.8333V81.6667ZM16.3333 89.8334C11.8417 89.8334 8.16667 86.1992 8.16667 81.6667V65.3334H16.3333V81.6667H32.6667V89.8334H16.3333ZM81.6667 8.16675C86.1992 8.16675 89.8333 11.8417 89.8333 16.3334V32.6667H81.6667V16.3334H65.3333V8.16675H81.6667ZM36.75 28.5834V36.7501H44.9167V69.4167H53.0833V36.7501H61.25V28.5834H36.75Z" />
        </SvgIcon>
    );
}

export interface TextButtonProps {
    user?: any;
    uid?: string;
    background: string;
}

const  TextButton: React.FC<TextButtonProps> = ({ background }) => {
    const ctx = useContext(AppCtx);
    const t = (key: TRANSLATION_KEYS) => ctx.translations[ctx.nativeLanguage] ? ctx.translations[ctx.nativeLanguage][key] : ctx.translations['en'][key];
        const textStyle = {
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
                <Button variant='text' color="secondary" aria-label="Text" sx={textStyle} href="#">
                    <TextRecIcon color="secondary" sx={{ fontSize: 100 }} />
                    <span>{t("TEXT")}</span>
                </Button>

        )

    }

export default TextButton;


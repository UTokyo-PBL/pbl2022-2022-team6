import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
// import ViewInArIcon from '@mui/icons-material/ViewInAr';
// import TitleIcon from '@mui/icons-material/Title';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 80,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(40px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.4031 17.3101C21.4031 17.6901 21.1931 18.0201 20.8731 18.1901L12.9731 22.6301C12.8131 22.7501 12.6131 22.8101 12.4031 22.8101C12.1931 22.8101 11.9931 22.7501 11.8331 22.6301L3.93308 18.1901C3.61308 18.0201 3.40308 17.6901 3.40308 17.3101V8.31006C3.40308 7.93006 3.61308 7.60006 3.93308 7.43006L11.8331 2.99006C11.9931 2.87006 12.1931 2.81006 12.4031 2.81006C12.6131 2.81006 12.8131 2.87006 12.9731 2.99006L20.8731 7.43006C21.1931 7.60006 21.4031 7.93006 21.4031 8.31006V17.3101ZM12.4031 4.96006L6.44308 8.31006L12.4031 11.6601L18.3631 8.31006L12.4031 4.96006ZM5.40308 16.7201L11.4031 20.1001V13.3901L5.40308 10.0201V16.7201ZM19.4031 16.7201V10.0201L13.4031 13.3901V20.1001L19.4031 16.7201Z' fill='white'/%3E%3C/svg%3E");`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#FAEEFC' : '#8338EC',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.9032 4.81006L20.0632 9.16006L19.1032 9.42006C18.6532 8.55006 18.1932 7.68006 17.6632 7.24006C17.1332 6.81006 16.5132 6.81006 15.9032 6.81006H13.4032V17.3101C13.4032 17.8101 13.4032 18.3101 13.7332 18.5601C14.0732 18.8101 14.7332 18.8101 15.4032 18.8101V19.8101H9.40316V18.8101C10.0732 18.8101 10.7332 18.8101 11.0732 18.5601C11.4032 18.3101 11.4032 17.8101 11.4032 17.3101V6.81006H8.90316C8.29316 6.81006 7.67316 6.81006 7.14316 7.24006C6.61316 7.68006 6.15316 8.55006 5.70316 9.42006L4.74316 9.16006L5.90316 4.81006H18.9032Z' fill='white'/%3E%3C/svg%3E%0A");`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

// function SwitchThumb(props: any) {
//     return (
//         <div className={`switch ${props.isChecked ? 'checked' : 'unchecked'}`}>
//             {props.isChecked ? <ViewInArIcon /> : <TitleIcon />}
//         </div>
//     );
// }

interface Props {
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}

const ToggleSwitch: React.FC<Props> = ({onChange}) => {
    return (
        <FormGroup>
            <Stack direction="row" spacing={1} alignItems="center">
                {/* <span></span> */}
                {/* <Typography>Text</Typography> */}
                <MaterialUISwitch sx={{ m: 1 }} defaultChecked onChange={onChange} />
                {/* <Typography>Objects</Typography> */}
            </Stack>
        </FormGroup>
    );
}

export default ToggleSwitch;
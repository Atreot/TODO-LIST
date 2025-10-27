import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '../../store/hook';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../store/slices/tasksSlice';

export default function NotificationsSnackbar() {
    const dispatch = useDispatch();
    const notification = useAppSelector(state => state.tasksSlice.notification);
    const open = notification !== null;

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setNotification(null));
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={(e) => { notification?.action && notification?.action(); handleClose(e); }}>
                ОТМЕНА
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>

            {notification?.action !== undefined ?
                <Snackbar
                    open={open}
                    autoHideDuration={notification?.autoHideDuration}
                    onClose={handleClose}
                    message={notification?.message}
                    action={action}
                /> :
                <Snackbar
                    open={open}
                    autoHideDuration={notification?.autoHideDuration}
                    onClose={handleClose}
                    message={notification?.message}
                />
            }
        </div>
    );
}
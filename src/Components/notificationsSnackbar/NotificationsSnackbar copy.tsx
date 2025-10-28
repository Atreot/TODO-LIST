import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import './NotificationSnackbar.scss'
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '../../store/hook';
import { useDispatch } from 'react-redux';
import { removeNotific, setNotification, type IDeleteNotific, type INotific, type TNotificationVariant } from '../../store/slices/tasksSlice';
interface INotificData {
    message:string,
    timeout:number
} 
const notificationMap:Record<TNotificationVariant, INotificData> = {
    'compete':{
        message:"Задача выполнена",
        timeout:2000
    },
    'cancel':{
        message:"Отменено выполнение",
        timeout:3000
    },
    'delete':{
        message:"Задача удалена",
        timeout:2000
    }

}
export default function NotificationsSnackbar() {
    const dispatch = useDispatch();
    const [notifications, setNotifications] = React.useState<Array<INotific | IDeleteNotific>>([])
    const notification = useAppSelector(state => state.tasksSlice.notification);
    const notific = useAppSelector(state => state.tasksSlice.notific);
    const open = notification !== null;

    React.useEffect(()=>{
        console.log('notific',notific)
        setNotifications(Object.values(notific))
    },[notific])

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
        <div className='notification-container'>
            {/* {
                notifications.map((oneNotific, index)=> {
                    const {id:notificId, variant, task} = oneNotific
                    const data = notificationMap[variant]
                    const isDelete = (variant === 'delete' && Boolean(task))
                    const handleClose =()=> {
                        console.log('handleClose', notificId)
                        dispatch(removeNotific(oneNotific))
                    }
                    const handleAbortDelete = () => {
                        
                    }
                    return (
                        <Snackbar
                            sx={{
                                bottom:`${(index+1) * (24) + (index * 48) }px!important` , 
                            }}
                            key={notificId}
                            open={true}
                            autoHideDuration={data.timeout}
                            // onClose={()=>{}}
                            onClose={handleClose}
                            message={data.message}
                        />
                    )
                })
            } */}

            {/* {notification?.action ?
                <Snackbar
                    open={open}
                    autoHideDuration={notification?.autoHideDuration}
                    onClose={handleClose}
                    message={notification?.message}
                />:
                <Snackbar
                    open={open}
                    autoHideDuration={notification?.autoHideDuration}
                    onClose={handleClose}
                    message={notification?.message}
                    action={action}
                />
            } */}
        </div>
    );
}
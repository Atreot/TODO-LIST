import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import './NotificationSnackbar.scss'
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '../../store/hook';
import { useDispatch } from 'react-redux';
import {  type TNotificationVariant } from '../../store/slices/tasksSlice';
import { useState } from 'react';
import { notificationService, type NotificationEvent, type NotificationType } from './notificationService/NotificationService';
import { type Notification } from '../notificationsSnackbar/notificationService/NotificationService';
interface INotificData {
    message: string,
    timeout: number
}
const notificationMap: Record<TNotificationVariant, INotificData> = {
    'compete': {
        message: "Задача выполнена",
        timeout: 2000
    },
    'cancel': {
        message: "Отменено выполнение",
        timeout: 3000
    },
    'delete': {
        message: "Задача удалена",
        timeout: 2000
    }

}
export default function NewNotificationsSnackbar() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    React.useEffect(() => {
        const unsubscribeShow = notificationService.onShow((event: NotificationEvent) => {
            const newNotification: Notification = {
                ...event,
                id: Math.random().toString(36).substr(2, 9),
                timestamp: new Date(),
                read: false,
            };

            setNotifications(prev => [newNotification, ...prev]);
        });

        const unsubscribeClearAll = notificationService.onClearAll(() => {
            setNotifications([]);
        });

        const autoCloseNotifications = notifications.filter(
            notification => notification.duration && notification.duration > 0
        );

        const timeouts = autoCloseNotifications.map(notification =>
            setTimeout(() => {
                removeNotification(notification.id);
            }, notification.duration)
        );

        return () => {
            unsubscribeShow();
            unsubscribeClearAll();
            timeouts.forEach(timeout => clearTimeout(timeout));
        };

    }, []);

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    }

    if (notifications.length === 0) {
        return null;
    }

    return (
        <div className='notification-container'>
            {
                notifications.map(

                    (notification, index) => {

                        const handleClose = () => {
                            console.log('handleClose', notification.id);
                            removeNotification(notification.id);
                        }
                        const action = (
                            <React.Fragment>
                                <Button color="secondary" size="small" onClick={(e) => {
                                    notification?.action && notification.action(); handleClose();
                                }}>
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
                        return (notification?.action ?
                            <Snackbar
                                sx={{
                                    bottom: `${(index + 1) * (24) + (index * 48)}px!important`,
                                    textTransform: 'uppercase',
                                }}
                                key={notification.id}
                                open={true}
                                autoHideDuration={notification.duration}
                                onClose={handleClose}
                                message={notification.message}
                                action={action}
                            />

                            : <Snackbar
                                sx={{
                                    bottom: `${(index + 1) * (24) + (index * 48)}px!important`,
                                    textTransform: 'uppercase',
                                }}
                                key={notification.id}
                                open={true}
                                autoHideDuration={notification.duration}
                                onClose={handleClose}
                                message={notification.message}
                            />)


                    })
            }
        </div>
    );
}
import { eventBus } from "./EventBus";

export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'field_change';

export interface NotificationEvent {
  type: NotificationType;
  message: string;
  title?: string;
  duration?: number; // 0 = не закрывать автоматически
  field?: string;
  action?: ()=>void;
}

export interface Notification extends NotificationEvent {
  id: string;
  timestamp: Date;
  read: boolean;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (event: NotificationEvent) => string;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  clearByType: (type: NotificationType) => void;
  unreadCount: number;
}

export class NotificationService {
  private static instance: NotificationService;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  show(event: NotificationEvent): void {
    eventBus.emit('notification:show', event);
  }

  info(message: string, title: string = 'Информация', duration: number = 4000): void {
    this.show({
      type: 'info',
      message,
      title,
      duration,
    });
  }

  clearAll(): void {
    eventBus.emit('notification:clear-all');
  }

  // Подписка на события
  onShow(callback: (event: NotificationEvent) => void): () => void {
    return eventBus.on('notification:show', callback);
  }

  onClearAll(callback: () => void): () => void {
    return eventBus.on('notification:clear-all', callback);
  }

 

  
}

export const notificationService = NotificationService.getInstance();
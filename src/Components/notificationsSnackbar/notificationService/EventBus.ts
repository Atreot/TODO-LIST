// events/EventBus.ts
type EventCallback<T = any> = (data: T) => void;

class EventBus {
  private events: Map<string, EventCallback[]> = new Map();

  on(event: string, callback: EventCallback): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    
    const callbacks = this.events.get(event)!;
    callbacks.push(callback);

    // Возвращаем функцию для отписки
    return () => {
      this.off(event, callback);
    };
  }

  off(event: string, callback: EventCallback): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      this.events.set(event, callbacks.filter(cb => cb !== callback));
    }
  }

  emit(event: string, data?: any): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      // Вызываем асинхронно чтобы не блокировать основной поток
      setTimeout(() => {
        callbacks.forEach(callback => {
          try {
            callback(data);
          } catch (error) {
            console.error(`Error in event handler for ${event}:`, error);
          }
        });
      }, 0);
    }
  }



  destroy(): void {
    this.events.clear();
  }

}

// Глобальный инстанс EventBus
export const eventBus = new EventBus();
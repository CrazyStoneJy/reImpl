type ListenerData = {
    once: boolean;
    listener: (...args: any[]) => void;
}

interface IEventEmitter {
    addListener(event: string, listener: (...args: any[]) => void): void;
    on(event: string, listener: (...args: any[]) => void): void;
    once(event: string, listener: (...args: any[]) => void): void;

    removeListener(event: string, listener: (...args: any[]) => void): void;
    off(event: string, listener: (...args: any[]) => void): void;
    removeAllListener(event?: string): void;

    emit(event: string, ...args: any[]): void;

    eventNames(): string[];
    listenerCount(event: string): number;
}

class EventEmitter implements IEventEmitter{

    eventMap: Map<string, ListenerData[]> = new Map<string, ListenerData[]>();

    _addListener(event: string, listener: (...args: any[]) => void, isOnce: boolean) {
        const listenerData = { once: isOnce, listener };
        const listeners = this.eventMap.get(event);
        if (listeners && listeners.length > 0) {
            listeners.push(listenerData);
        } else {
            this.eventMap.set(event, [listenerData]);
        }
    }

    addListener(event: string, listener: (...args: any[]) => void) {
        return this._addListener(event, listener, false);
    }

    on = this.addListener;

    once(event: string, listener: (...args: any[]) => void) {
        return this._addListener(event, listener, true);
    }

    removeListener(event: string, listener: (...args: any[]) => void) {
        if (!this.eventMap.get(event)) {
            return;
        }
        const listeners = this.eventMap.get(event);
        if (listeners) {
            const index: number = this.indexOf(listeners, listener);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }

    off = this.removeListener;

    removeAllListener(event?: string) {
        if (event) {
            this.eventMap.delete(event);
        } else {
            this.eventMap.clear();
        }
    }

    indexOf(listenerDatas: ListenerData[], listener: (...args: any[]) => void): number {
        let index = -1;
        listenerDatas.forEach((listenerData: ListenerData, i: number) => {
            if(listener === listenerData.listener) {
                index = i;
                return;
            }
        });
        return index;
    }
    
    emit(event: string, ...args: any[]) {
        const listeners: ListenerData[] | undefined = this.eventMap.get(event);
        if (listeners) {
            listeners.forEach((listenerData: ListenerData) => {
                const { listener } = listenerData;
                listener(args);
            });
            // remove once
            this.removeOnce(listeners);
        }
    }

    removeOnce(listeners: ListenerData[]) {
        let i = 0;
        while (i < listeners.length) {
            const { once } = listeners[i];
            if (once) {
                listeners.splice(i, 1);
            } else {
                i++;
            }
        }
    }

    eventNames(): string[] {
        return Array.from(this.eventMap.keys());
    }

    listenerCount(event: string): number {
        return this.eventMap?.get(event)?.length || 0;
    }

}

export default EventEmitter;
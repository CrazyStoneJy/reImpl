# 对一些小功能或者类库的轻实现，主要用于理解其原理。
**`eventEmitter`**   
[消息通知](./eventEmitter/index.ts)  
以下是相关API：
```typescript
addListener(event: string, listener: (...args: any[]) => void): void;
on(event: string, listener: (...args: any[]) => void): void;
once(event: string, listener: (...args: any[]) => void): void;

removeListener(event: string, listener: (...args: any[]) => void): void;
off(event: string, listener: (...args: any[]) => void): void;
removeAllListener(event?: string): void;

emit(event: string, ...args: any[]): void;

eventNames(): string[];
listenerCount(event: string): number;
```
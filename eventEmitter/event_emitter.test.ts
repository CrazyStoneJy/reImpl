import EventEmitter from ".";

describe('event emitter', () => {
    it('add listener', () => {
        const eventEmitter = new EventEmitter();
        const fn = (args: any[]) => {
            console.log(args);
        };
        expect(eventEmitter.listenerCount('test')).toBe(0);
        eventEmitter.addListener('test', fn);
        expect(eventEmitter.listenerCount('test')).toBe(1);
    });

    it('remove listener', () => {
        const eventEmitter = new EventEmitter();
        const fn = (args: any[]) => {
            console.log(args);
        };
        expect(eventEmitter.listenerCount('foo')).toBe(0);
        eventEmitter.addListener('foo', fn);
        expect(eventEmitter.listenerCount('foo')).toBe(1);
        eventEmitter.removeListener('foo', fn);
        expect(eventEmitter.listenerCount('foo')).toBe(0);
    });


    it('emit', () => {
        const eventEmitter = new EventEmitter();
        const fn = (args: any[]) => {
            console.log(args);
        };
        expect(eventEmitter.listenerCount('foo')).toBe(0);
        eventEmitter.addListener('foo', fn);
        eventEmitter.emit('foo', 'wtf');
        eventEmitter.emit('foo', 'wtf');
    });

    it('once', () => {
        const eventEmitter = new EventEmitter();
        const fn = (args: any[]) => {
            console.log(args);
        };
        expect(eventEmitter.listenerCount('foo')).toBe(0);
        eventEmitter.once('foo', fn);
        eventEmitter.emit('foo', 'once');
        eventEmitter.emit('foo', 'once');
    });

})
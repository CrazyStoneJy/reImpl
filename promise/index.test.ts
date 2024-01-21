function foo(a: number, b: number): number {
    return a + b;
}

describe('promise', () => {
    test('foo', () => {
        expect(foo(1, 2)).toBe(3);
    });
});
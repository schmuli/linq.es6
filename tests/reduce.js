"use strict";

describe('Enumerable.prototype.reduce', function () {
    it('to throw when passed invalid function argument', function () {
        expect(function () {
            Enumerable.range(0, 5).reduce('foo');
        }).toThrow();
    });

    it('to throw when reducing an empty collection with no initial value', function () {
        var xs = Enumerable.empty();

        expect(function () {
            xs.reduce(function (acc, x) {
                return acc + x;
            });
        }).toThrow();
    });

    it('should return 10 when reducing without an initial value', function () {
        var xs = Enumerable.range(0, 5);

        var res = xs.reduce(function (acc, x) {
            return acc + x;
        });

        expect(res).toBe(10);
    });

    it('should return 20 when reducing with index without an initial value', function () {
        var xs = Enumerable.range(0, 5);

        var res = xs.reduce(function (acc, x, i) {
            return acc + x + i;
        });

        expect(res).toBe(20);
    });

    it('to not throw when reducing an empty collection with an initial value', function () {
        var xs = Enumerable.empty();

        var res = xs.reduce(function (acc, x) {
            return acc + x;
        }, 0);

        expect(res).toBe(0);
    });

    it('should return 10 when reducing with an initial value', function () {
        var xs = Enumerable.range(0, 5);

        var res = xs.reduce(function (acc, x) {
            return acc + x;
        }, 0);

        expect(res).toBe(10);
    });

    it('should return 20 when reducing with index and an initial value', function () {
        var xs = Enumerable.range(0, 5);

        var res = xs.reduce(function (acc, x, i) {
            return acc + x + i;
        }, 0);

        expect(res).toBe(20);
    });

    it('should have a results selector', function () {
        var arr = ["apple", "mango", "orange", "passionfruit", "grape"].asEnumerable();

        var result = arr.reduce(function (longest, next) {
                return next.length > longest.length ? next : longest;
            },
            "banana",
            function (fruit) {
                return fruit.toUpperCase();
            });

        expect(result).toBe('PASSIONFRUIT');
    });

    it('should be able to use a result selector without an initial value', function () {
        var arr = ["apple", "mango", "orange", "passionfruit", "grape"].asEnumerable();

        var result = arr.reduce(function (longest, next) {
            return next.length > longest.length ? next : longest
        }, function (fruit) {
            return fruit.toUpperCase();
        });

        expect(result).toBe('PASSIONFRUIT');
    });
});

"use strict";

var Enumerable = (function () {

    class Expect {
        static validFn(fn, message) {
            Expect.valid(typeof fn === 'function', message);
        }

        static validArg(arg, message) {
            Expect.valid(!!arg, message);
        }

        static valid(condition, message) {
            if(!condition) {
                throw new TypeError(message);
            }
        }
    }

    class Enumerable {
        constructor(iterator, source) {
            this.iterator = function () {
                return iterator(source);
            };
        }

        // Static

        static asEnumerable(collection) {
            if (collection instanceof Enumerable) {
                return collection;
            }

            Expect.valid(collection instanceof Array);

            return new Enumerable(function* () {
                for (var i = 0; i < collection.length; i += 1) {
                    yield {item: collection[i], index: i};
                }
            });
        }

        static range(start, count) {
            Expect.valid(count > 1);

            start = start - 1;
            return new Enumerable(function* () {
                for (var i = 0; i < count; i += 1) {
                    yield {
                        item: start += 1,
                        index: i
                    };
                }
            });
        }

        static empty() {
            return new Enumerable(function* () {
            });
        }

        // Immediate

        all(predicate) {
            Expect.validFn(predicate);

            for (var i of this.iterator()) {
                if (!predicate(i.item, i.index)) {
                    return false;
                }
            }
            return true;
        }

        any(predicate) {
            return this.first(predicate) !== undefined;
        }

        count(predicate) {
            if (predicate) {
                return this.filter(predicate).count();
            }

            return this.reduce(function (count) {
                return count + 1;
            }, 0);
        }

        first(predicate) {
            if (predicate) {
                return this.filter(predicate).first();
            }

            var next = this.iterator().next();
            return !next.done
                ? next.value.item
                : undefined;
        }

        forEach(fn) {
            Expect.validFn(fn);

            for (var i of this.iterator()) {
                fn(i.item, i.index);
            }
            return this;
        }

        last(predicate) {
            if (predicate) {
                return this.filter(predicate).last();
            }

            var last;
            for (var i of this.iterator()) {
                last = i.item;
            }
            return last;
        }

        reduce(fn, initialValue, resultSelector) {
            Expect.validFn(fn);

            if (resultSelector === undefined && typeof initialValue === 'function') {
                resultSelector = initialValue;
                initialValue = undefined;
            }

            var iterator = this.iterator();
            var next = iterator.next();

            var accumulate = initialValue;
            if (initialValue === undefined) {
                if (next.done) {
                    throw new TypeError('Sequence contains no elements');
                }
                accumulate = next.value.item;
                next = iterator.next();
            }

            while (!next.done) {
                accumulate = fn(accumulate, next.value.item, next.value.index);
                next = iterator.next();
            }

            if (resultSelector) {
                accumulate = resultSelector(accumulate);
            }

            return accumulate;
        }

        single(predicate) {
            if (predicate) {
                return this.filter(predicate).single();
            }

            var iterator = this.iterator();
            var next = iterator.next();

            if (!next.done) {
                if (!iterator.next().done) {
                    throw new Error('Sequence contains more than one element');
                }
                return next.value.item;
            }
            return undefined;
        }

        toArray() {
            return reduceInternal(this, false);
        }

        // Lazy

        concat(collection) {
            Expect.validArg(collection);

            return [this, Enumerable.asEnumerable(collection)]
                .asEnumerable()
                .selectMany(identity);
        }

        defaultIfEmpty(defaultValue) {
            return this._enumerable(function* (iterator) {
                var iter = iterator();

                var next = iter.next();
                if (!next.done) {
                    yield next.value;
                    yield* iter;
                } else {
                    yield {
                        item: defaultValue,
                        index: 0
                    };
                }
            });
        }

        reverse() {
            var source = this;

            return new Enumerable(function* () {
                var reversed = reduceInternal(source, true);
                yield* reversed.asEnumerable().iterator();
            });
        }

        select(selector) {
            Expect.validFn(selector);

            return this._enumerable(function* (iterator) {
                for (var i of iterator()) {
                    yield {
                        item: selector(i.item, i.index),
                        index: i.index
                    };
                }
            });
        }

        selectMany(collectionSelector, resultSelector) {
            Expect.validFn(collectionSelector);

            resultSelector = resultSelector || defaultResultSelector;
            return this._enumerable(function* (iterator) {
                var index = 0;
                for (var i of iterator()) {
                    var inner = collectionSelector(i.item, i.index);
                    for (var j of Enumerable.asEnumerable(inner)) {
                        yield {
                            item: resultSelector(i.item, j),
                            index: index++
                        };
                    }
                }
            });
        }

        skip(count) {
            Expect.valid(count >= 0);

            return this.skipWhile(function (item, index) {
                return index < count;
            });
        }

        skipWhile(selector) {
            Expect.validFn(selector);

            var test = skip;

            return this._enumerable(function* (iterator) {
                for (var i of iterator()) {
                    if (!test(i.item, i.index)) {
                        yield i;
                    }
                }
            });

            function skip(item, index) {
                var result = selector(item, index);
                if (!result) {
                    test = function () {
                        return false;
                    };
                }
                return result;
            }
        }

        where(predicate) {
            Expect.validFn(predicate);

            return this._enumerable(function* (iterator) {
                for (var i of iterator()) {
                    if (predicate(i.item, i.index)) {
                        yield i;
                    }
                }
            });
        }

        take(count) {
            Expect.valid(count >= 0);

            return this.takeWhile(function (item, index) {
                return index < count;
            });
        }

        takeWhile(selector) {
            Expect.validFn(selector);

            return this._enumerable(function* (iterator) {
                for (var i of iterator()) {
                    if (!selector(i.item, i.index)) {
                        break;
                    }
                    yield i;
                }
            });
        }

        // private
        _enumerable(iterator) {
            return new Enumerable(iterator, this.iterator);
        }
    }

    copy('all', 'every');
    copy('any', 'some');
    copy('reduce', 'aggregate');
    copy('where', 'filter');
    copy('select', 'map');

    Enumerable.prototype[Symbol.iterator] = function () {
        var iterator = this.iterator();

        return {
            next() {
                var i = iterator.next();
                return i.done ? i : {value: i.value.item};
            }
        };
    };

    Array.prototype.asEnumerable = function () {
        return Enumerable.asEnumerable(this);
    };

    return Enumerable;

    function reduceInternal(enumerable, reverse) {
        var fn = reverse ? 'unshift' : 'push';
        return enumerable.reduce(function (result, item) {
            result[fn](item);
            return result;
        }, []);
    }

    function copy(existingName, newName) {
        Enumerable.prototype[newName] = Enumerable.prototype[existingName];
    }

    function identity(x) {
        return x;
    }

    function defaultResultSelector(coll, item) {
        return item;
    }
}());

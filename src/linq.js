"use strict";

var Enumerable = (function () {

    class Enumerable {
        constructor(iterator, source) {
            this.iterator = function () {
                return iterator(source);
            };
        }

        // Static

        static asEnumerable(array) {
            if (array instanceof Enumerable) {
                return array;
            }

            return new Enumerable(function* () {
                for (var i = 0; i < array.length; i += 1) {
                    yield {item: array[i], index: i};
                }
            });
        }

        static range(start, count) {
            return new Enumerable(function* () {
                for (var i = start, index = 0; i <= count; i += 1, index += 1) {
                    yield {
                        item: i,
                        index: index
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

        reduce(fn, initialValue, resultSelector) {
            if (resultSelector === undefined && typeof initialValue === 'function') {
                resultSelector = initialValue;
                initialValue = undefined;
            }

            var iterator = this.iterator();
            var next;

            var accumulate = initialValue;
            if (initialValue === undefined) {
                next = iterator.next();
                if (next.done) {
                    throw new TypeError('Sequence contains no elements');
                }
                accumulate = next.value.item;
            }

            do {
                next = iterator.next();
                accumulate = fn(accumulate, next.value.item, next.value.index);
            } while(!next.done);

            if (resultSelector) {
                accumulate = resultSelector(accumulate);
            }

            return accumulate;
        }

        toArray() {
            return reduceInternal(this, false);
        }

        // Lazy

        concat(collection) {
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
            return this.skipWhile(function (item, index) {
                return index < count;
            });
        }

        skipWhile(selector) {
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
            return this._enumerable(function* (iterator) {
                for (var i of iterator()) {
                    if (predicate(i.item, i.index)) {
                        yield i;
                    }
                }
            });
        }

        take(count) {
            return this.takeWhile(function (item, index) {
                return index < count;
            });
        }

        takeWhile(selector) {
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

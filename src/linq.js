"use strict"

var Enumerable = (function () {

    class Enumerable {
        constructor(iterator) {
            this.iterator = iterator;
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
                    yield {item: i, index: index};
                }
            });
        }

        static empty() {
            return new Enumerable(function* () { });
        }

        // Immediate

        all(predicate) {
            for(var i of this.iterator()) {
                if (!predicate(i.item, i.index)) {
                    return false;
                }
            }
            return true;
        }

        any(predicate) {
            for(var i of this.iterator()) {
                if (!predicate || predicate(i.item, i.index)) {
                    return true;
                }
            }
            return false;
        }

        count(predicate) {
            if (predicate) {
                return this.filter(predicate).count();
            }

            return this.reduce(function (count) { return count + 1; }, 0);
        }

        first(predicate) {
            if (predicate) {
                return this.filter(predicate).first();
            }

            var next = this.iterator().next();
            return next && !next.done
                ? next.value.item
                : undefined;
        }

        single(predicate) {
            if (predicate) {
                return this.filter(predicate).single();
            }

            var iterator = this.iterator();
            var next = iterator.next();
            if (next.done) {
                return undefined;
            }

            if (!iterator.next().done) {
                throw new Error('Sequence contains more than one element');
            }

            return next.value.item;
        }

        reduce(fn, initialValue, resultSelector) {
            if (resultSelector === undefined && typeof initialValue === 'function') {
                resultSelector = initialValue;
                initialValue = undefined;
            }

            var iterator = this.iterator();
            var next = iterator.next();

            var accumulate;
            if(initialValue === undefined){
                if (next.done) {
                    throw new TypeError('Sequence contains no elements');
                }
                accumulate = next.value.item;
                next = iterator.next();
            } else {
                accumulate = initialValue;
            }

            while(!next.done) {
                accumulate = fn(accumulate, next.value.item, next.value.index);
                next = iterator.next();
            }

            if(resultSelector) {
                accumulate = resultSelector(accumulate);
            }

            return accumulate;
        }

        forEach(fn) {
            for (var i of this.iterator()) {
                fn(i.item, i.index);
            }
            return this;
        }

        toArray() {
            var results = [];
            this.forEach(function (i) {
                results.push(i);
            });
            return results;
        }

        // Lazy

        concat(collection) {
            collection = Enumerable.asEnumerable(collection);

            return [this, collection]
                .asEnumerable()
                .selectMany(function (x) { return x; });
        }

        select(selector) {
            var iterator = this.iterator;
            return new Enumerable(function* () {
                for (var i of iterator()) {
                    yield {
                        item: selector(i.item, i.index),
                        index: i.index
                    };
                }
            });
        }

        selectMany(collectionSelector, resultSelector) {
            resultSelector = resultSelector || function (_, j) { return j; };
            var iterator = this.iterator;
            return new Enumerable(function* () {
                var index = 0;
                for(var i of iterator()) {
                    var inner = collectionSelector(i.item, i.index);
                    for(var j of Enumerable.asEnumerable(inner)) {
                        yield { item: resultSelector(i.item, j), index: index++ };
                    }
                }
            });
        }

        where(predicate) {
            var iterator = this.iterator;
            return new Enumerable(function* () {
                for (var i of iterator()) {
                    if (predicate(i.item, i.index)) {
                        yield i;
                    }
                }
            });
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

    function copy(existingName, newName) {
        Enumerable.prototype[newName] = Enumerable.prototype[existingName];
    }
}());

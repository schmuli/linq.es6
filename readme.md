# LINQ in ES6

An implementation of LINQ using features available in ES6, such as Iterators and Generators.

## Enabling ES6

The implementation uses ES6 features available in Chrome Canary, and will be updated (hopefully) when newer features are supported in Chrome Canary.

### Browsers

Support Chrome Canary

Enabling Experimental JavaScript features

### Node.js with V8

Enabling Harmony flag

## Getting Linq.es6

NPM

Bower

Nuget

## Examples

## Supported LINQ Functions

### Creation Functions

* asEnumerable(array)
* range(start, count)
* repeat(value, count)
* empty()

### Immediate Functions

* all(predicate)
* any(predicate?)
* count(predicate?)
* first(predicate?)
* forEach(fn)
* last(predicate?)
* reduce(fn, initialValue?, resultSelector?)
* single(predicate?)
* toArray()

### Lazy Functions

* concat(collection)
* defaultIfEmpty(defaultValue?)
* reverse()
* select(predicate)
* selectMany(collectionSelector, resultSelector?)
* skip(count)
* skipWhile(predicate)
* where(predicate)
* take(count)
* takeWhile(predicate)

## Building and Testing

Karma
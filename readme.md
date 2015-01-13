## Example Usage

```javascript
function whereGreaterThan5(item, index) {
    return item > 5;
}

function selector(item, index) {
    return item + 10;
}

var enumerable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .asEnumerable()
    .filter(whereGreaterThan5)
    .map(selector);

log('toArray: ' + enumerable.toArray());

var enumerable1 = Enumerable.asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .filter(whereGreaterThan5)
    .map(selector);

log('toArray1: ' + enumerable1.toArray());

var range = Enumerable.range(1, 10);
var range1 = Enumerable.range(10, 20);

log('range: ' + range.toArray());
log('range1: ' + range1.toArray());

var empty = Enumerable.empty();
for(var i of empty.select(function () { throw new Error('never call'); })) {}

} catch (e) {
    log('error: ' + e + (e.stack || ''));
}

var logger;
function log(message) {
    if (logger === undefined) {
        logger = document.getElementById('log');
    }

    var lineNumber = logger.childElementCount + 1;
    var text = document.createTextNode(lineNumber + ': ' + (message.toString() || ''));
    var line = document.createElement('p');
    line.appendChild(text);
    logger.appendChild(line);
}
```
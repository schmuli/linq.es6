"use strict";

describe('Enumerable Specs', function () {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    it('can convert from an array', function () {
        // Arrange

        // Act
        var enumerable = Enumerable.asEnumerable(array);

        // Assert
        expect(enumerable).toEqual(jasmine.any(Enumerable));
    });

    it('can convert from an array, using Array.prototype', function () {
        // Act
        var enumerable = array.asEnumerable();

        // Assert
        expect(enumerable).toEqual(jasmine.any(Enumerable));
    });
});

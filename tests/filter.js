"use strict";

describe('Enumerable.prototype.filter', function () {

    it('throws when passed an invalid predicate', function () {
        // Arrange
        var enumerable = [1, 2, 3, 4, 5].asEnumerable();

        // Act
        expect(function () {
            enumerable.filter('fun');
        }).toThrow();
    });

    it('should return zero elements when no elements match the predicate', function () {
        // Arrange
        var enumerable = [1, 2, 3, 4, 5].asEnumerable();

        // Act
        var result = enumerable
            .filter(function () {
                return false;
            })
            .toArray();

        // Assert
        expect(result.length).toBe(0);
    });

    it('should return elements that match the predicate', function () {
        // Arrange
        var enumerable = [1, 2, 3, 4, 5].asEnumerable();

        // Act
        var result = enumerable
            .filter(function (i) {
                return i < 3;
            })
            .toArray();

        // Assert
        expect(result.length).toBe(2);
    });

});

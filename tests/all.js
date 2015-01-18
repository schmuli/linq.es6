"use strict";

describe('Enumerable.prototype.all', function () {

    it('to throw when passed invalid function argument', function () {
        // Arrange
        var enumerable = [1].asEnumerable();

        // Act
        expect(function () {
            enumerable.all();
        }).toThrow();
    });

    it('should return true if the collection is empty', function () {
        // Arrange
        var enumerable = Enumerable.empty();

        // Act
        var result = enumerable.all(function () {
            return true;
        });

        // Assert
        expect(result).toBe(true);
    });

    it('should return true when all elements pass predicate', function () {
        // Arrange
        var enumerable = [1, 2, 3].asEnumerable();

        // Act
        var result = enumerable.all(function (i) {
            return i < 10;
        });

        // Assert
        expect(result).toBe(true);
    });

    it('should return false if any element does not pass the test', function () {
        // Arrange
        var enumerable = [1, 20, 3].asEnumerable();

        // Act
        var result = enumerable.all(function (i) {
            return i < 10;
        });

        // Assert
        expect(result).toBe(false);
    });

});

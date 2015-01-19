"use strict";

describe('Enumerable.prototype.count', function () {

    it('should return zero when there are no elements and no predicate', function () {
        // Arrange
        var enumerable = Enumerable.empty();

        // Act
        var result = enumerable.count();

        // Assert
        expect(result).toBe(0);
    });

    it('should return 5 where are at least one element and no predicate', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);

        // Act
        var result = enumerable.count();

        // Assert
        expect(result).toBe(5);
    });

    it('should return zero when no elements match the predicate', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);

        // Act
        var result = enumerable.count(function (i) {
            return i > 10;
        });

        expect(result).toBe(0);
    });

    it('should return true when at least one element matches the predicate', function () {
        // Arrange
        var enumerable = Enumerable.range(20, 5);

        // Act
        var result = enumerable.count(function (i) {
            return i > 10;
        });

        expect(result).toBe(5);
    });

});

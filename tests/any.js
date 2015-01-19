"use strict";

describe('Enumerable.prototype.any', function () {

    it('should return false when there are no elements and no predicate', function () {
        // Arrange
        var enumerable = Enumerable.empty();

        // Act
        var result = enumerable.any();

        // Assert
        expect(result).toBe(false);
    });

    it('should return true where are at least one element and no predicate', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);

        // Act
        var result = enumerable.any();

        // Assert
        expect(result).toBe(true);
    });

    it('should return false when no elements match the predicate', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);

        // Act
        var result = enumerable.any(function (i) {
            return i > 10;
        });

        expect(result).toBe(false);
    });

    it('should return true when at least one element matches the predicate', function () {
        // Arrange
        var enumerable = Enumerable.range(20, 5);

        // Act
        var result = enumerable.any(function (i) {
            return i > 10;
        });

        expect(result).toBe(true);
    });

});

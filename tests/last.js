"use strict";

describe('Enumerable.prototype.last', function () {

    it('should return undefined for an empty enumerable', function () {
        // Arrange
        var enumerable = Enumerable.empty();

        // Act
        var result = enumerable.last();

        // Assert
        expect(result).toBeUndefined();
    });

    it('should return the last element with no predicate', function () {
        // Arrange
        var enumerable = Enumerable.range(1, 5);

        // Act
        var result = enumerable.last();

        // Assert
        expect(result).toBe(5);
    });

    it('should throw when predicate is invalid', function () {
        // Arrange
        var enumerable = Enumerable.range(1, 5);

        // Assert
        expect(function () {
            enumerable.last(null);
        }).toThrow();
    });

    it('should return undefined when no element match predicate', function () {
        // Arrange
        var enumerable = Enumerable.range(1, 5);

        // Act
        var result = enumerable.last(function (i) {
            return i > 10;
        });

        // Assert
        expect(result).toBeUndefined();
    });

    it('should return the last element that matches the predicate', function () {
        // Arrange
        var item ={i: 2};
        var enumerable = [{i: 1}, {i: 2}, item, {i: 3}].asEnumerable();

        // Act
        var result = enumerable.last(function (i) {
            return i.i === 2;
        });

        // Assert
        expect(result).toBe(item);
    });

});

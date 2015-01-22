"use strict";

describe('Enumerable.prototype.single', function () {

    it('should return undefined for empty enumerable with no predicate', function () {
        // Arrange
        var enumerable = Enumerable.empty();

        // Act
        var result = enumerable.single();

        // Assert
        expect(result).toBeUndefined();
    });

    it('should return the only element with no predicate', function () {
        // Arrange
        var enumerable = [1].asEnumerable();

        // Act
        var result = enumerable.single();

        // Assert
        expect(result).toBe(1);
    });

    it('should throw if enumerable contains more than 1 element with no predicate', function () {
        // Arrange
        var enumerable = [1, 2].asEnumerable();

        // Act
        expect(function () {
            enumerable.single();
        }).toThrow();
    });

    it('should throw when passed invalid arguments', function () {
        // Arrange
        var enumerable = [1, 2].asEnumerable();

        // Assert
        expect(function () {
            enumerable.single(null);
        }).toThrow();
    });

    it('should return undefined when no elements match predicate', function () {
        // Arrange
        var enumerable = [1, 2, 3, 4].asEnumerable();

        // Act
        var result = enumerable.single(function (i) {
            return i > 100;
        });

        expect(result).toBeUndefined();
    });

    it('should return only element that matches predicate', function () {
        // Arrange
        var enumerable = [1, 2, 3, 4].asEnumerable();

        // Act
        var result = enumerable.single(function (i) {
            return i > 3;
        });

        expect(result).toBe(4);
    });

    it('should throw when more than one element matches the predicate', function () {
        // Arrange
        var enumerable = [1, 2, 3, 4].asEnumerable();

        // Act
        expect(function () {
            enumerable.single(function (i) {
                return i > 2;
            })
        }).toThrow();
    });

});

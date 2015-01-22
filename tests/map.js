"use strict";

describe('Enumerable.prototype.map', function () {

    it('should throw when passed invalid predicate', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 4);

        // Assert
        expect(function () {
            enumerable.map(null);
        }).toThrow();
    });

    it('should return empty enumerable for an empty enumerable', function () {
        // Arrange
        var enumerable = Enumerable.empty();

        // Act
        var result = enumerable.map(function () {});

        // Assert
        expect(result.toArray().length).toBe(0);
    });

    it('should returned mapped value for each element', function () {
        // Arrange
        var enumerable = Enumerable.range(1, 5);

        // Act
        var result = enumerable.map(function (i) {
            return i + ' mapped';
        });

        // Assert
        result.toArray().forEach(function (i, index) {
            expect(i).toBe((index + 1) + ' mapped');
        });
    });

});

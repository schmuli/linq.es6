"use strict";

describe('Enumerable.prototype.toArray', function () {

    it('should return an empty array for an empty enumerable', function () {
        // Arrange
        var array = [];

        // Act
        var result = array.asEnumerable().toArray();

        // Assert
        expect(result.length).toBe(0);
    });

    it('should return the items of the enumerable', function () {
        // Arrange
        var array = [1, 2, 3];

        // Act
        var result = array.asEnumerable().toArray();

        // Assert
        expect(result.length).toBe(array.length);
    });
});

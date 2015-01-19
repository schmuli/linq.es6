"use strict";

describe("Enumerable.range", function () {

    it('should return the correct number of elements', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);

        // Act
        var result = enumerable.toArray().length;

        // Assert
        expect(result).toBe(5);
    });

    it('should start from the correct value', function () {
        // Arrange
        var enumerable = Enumerable.range(1, 10);

        // Act
        var result = enumerable.toArray();

        // Assert
        expect(result[0]).toBe(1);
        expect(result.length).toBe(10);
        expect(result[9]).toBe(10);
    });

    it('should contain the correct number of elements', function () {
        // Arrange
        var enumerable = Enumerable.range(10, 20);

        // Act
        var result = enumerable.toArray();

        // Assert
        expect(result[0]).toBe(10);
        expect(result.length).toBe(20);
        expect(result[19]).toBe(29);
    });
});

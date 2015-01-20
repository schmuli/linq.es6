"use strict";

describe('Enumerable.prototype.concat', function () {

    it('should throw when passed invalid arguments', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);

        // Assert
        expect(function () {
            enumerable.concat(null);
        }).toThrow();
    });

    it('should combine an array', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);
        var array = [0, 1, 2, 3, 4];

        // Act
        var result = enumerable.concat(array).toArray();

        // Assert
        expect(result.length).toBe(10);
    });

    it('should combine an enumerable', function () {
        // Arrange
        var enumerable1 = Enumerable.range(0, 5);
        var enumerable2 = Enumerable.range(0, 5);

        // Act
        var result = enumerable1
            .concat(enumerable2)
            .toArray();

        // Assert
        expect(result.length).toBe(10);
    });

    it('should continue index values for second enumerable', function () {
        // Arrange
        var enumerable1 = Enumerable.range(0, 5);
        var enumerable2 = Enumerable.range(0, 5);
        var result = enumerable1.concat(enumerable2);
        var expectedIndex = 0;

        // Act
        result.forEach(function (i, index) {
            // Assert
            expect(index).toBe(expectedIndex);
            expectedIndex += 1;
        });
    });
    
});

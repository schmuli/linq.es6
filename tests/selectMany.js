"use strict";

describe('Enumerable.prototype.selectMany', function () {

    it('should throw when passed invalid arguments', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);

        // Assert
        expect(function () {
            enumerable.selectMany(null);
        }).toThrow();
    });

    it('should combine nested collections', function () {
        // Arrange
        var collection = [
            [1, 2, 3],
            [4, 5, 6]
        ];

        // Act
        var result = collection.asEnumerable()
            .selectMany(function (i) {
                return i;
            })
            .toArray();

        // Assert
        expect(result.length).toBe(6);
    });

    it('should combine nested collection properties', function () {
        // Arrange
        var collection = [
            { items: [1, 2, 3] },
            { items: [4, 5, 6] }
        ];

        // Act
        var result = collection.asEnumerable()
            .selectMany(function (i) {
                return i.items;
            })
            .toArray();

        // Assert
        expect(result.length).toBe(6);
    });

    it('should combine nested enumerables', function () {
        // Arrange
        var collection = [
            Enumerable.range(0, 5),
            Enumerable.range(0, 5)
        ].asEnumerable();

        // Act
        var result = collection.selectMany(function(i) {
            return i;
        }).toArray();

        // Assert
        expect(result.length).toBe(10);
    });

    it('should continue index values for second enumerable', function () {
        // Arrange
        var collection = [
            Enumerable.range(0, 5),
            Enumerable.range(0, 5)
        ].asEnumerable();
        var result = collection.selectMany(function(i) {
            return i;
        });
        var expectedIndex = 0;

        // Act
        result.forEach(function (i, index) {
            // Assert
            expect(index).toBe(expectedIndex);
            expectedIndex += 1;
        });
    });
    
});

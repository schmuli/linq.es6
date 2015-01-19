"use strict";

describe('The two basic principles of LINQ', function () {

    it('uses lazy evaluation', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 10);
        var called = false;

        // Act
        enumerable
            .filter(function () {
                called = true;
                return true;
            });

        // Assert
        expect(called).toBe(false);
    });

    it('can reuse an enumerable instance multiple times with same result', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 10);

        // Act
        var result1 = enumerable.first();
        var result2 = enumerable.last();

        // Assert
        expect(result1).toBe(0);
        expect(result2).toBe(10);
    });

});

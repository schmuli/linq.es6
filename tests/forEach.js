"use strict";

describe('Enumerable.prototype.forEach', function () {

    it('should throw for invalid parameters', function () {
        // Arrange
        var enumerable = [1,2,3,4].asEnumerable();

        // Assert
        expect(function () {
            enumerable.forEach(null);
        }).toThrow();
    });

    it('should return the original enumerable', function () {
        // Arrange
        var enumerable = [1,2,3,4].asEnumerable();

        // Act
        var result = enumerable.forEach(function () {});

        // Assert
        expect(result).toBe(enumerable);
    });

    it('should invoke callback for each item', function () {
        // Arrange
        var enumerable = [1,2,3,4,5].asEnumerable();
        var spy = {
            callback: function () {}
        };
        spyOn(spy, 'callback');

        // Act
        enumerable.forEach(function () {
            spy.callback();
        });

        // Assert
        expect(spy.callback.calls.count()).toBe(5);
    });

});

"use strict";

describe('Enumerable.prototype.first', function () {

    it('should return undefined for an empty enumerable with no predicate', function () {
        // Arrange
        var enumerable = Enumerable.empty();

        // Act
        var result = enumerable.first();

        // Assert
        expect(result).toBeUndefined();
    });

    it('should return the first item in an enumerable with no predicate', function () {
        // Arrange
        var item = {};
        var enumerable = [item].asEnumerable();

        // Act
        var result = enumerable.first();

        expect(result).toBe(item);
    });

    it('should throw when predicate is invalid', function () {
        // Arrange
        var enumerable = [1,2,3].asEnumerable();

        // Assert
        expect(function () {
            enumerable.first(null);
        }).toThrow();
    });

    it('should return undefined if no elements match predicate', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);

        // Act
        var result = enumerable.first(function (i) {
            return i > 10;
        });

        // Assert
        expect(result).toBeUndefined();
    });

    it('should return the first element that matches the predicate', function () {
       // Arrange
        var item ={i: 2};
        var enumerable = [{i: 1}, item, {i: 3}].asEnumerable();

        // Act
        var result = enumerable.first(function (i) {
            return i.i === 2;
        });

        // Assert
        expect(result).toBe(item);
    });

    it('should only invoke predicate until first matched element', function () {
        // Arrange
        var enumerable = [1,1,1].asEnumerable();

        var spy = {
            callback: function (i) {
                return i === 1;
            }
        };
        spyOn(spy, 'callback').and.callThrough();

        // Act
        enumerable.first(function (i) {
            return spy.callback(i);
        });

        // Assert
        expect(spy.callback.calls.count()).toBe(1);
    });

});

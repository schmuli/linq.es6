"use strict";

describe('Enumerable.prototype.takeWhile', function () {

    it('should throw error for invalid parameters', function () {
        // Arrange
        var enumerable = Enumerable.empty();
        
        // Assert
        expect(function () {
            enumerable.takeWhile(null);
        }).toThrow();
    });

    it('should return empty when no elements match predicate', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);
        
        // Act
        var result = enumerable.takeWhile(function (i) {
            return i > 5;
        });
        
        // Assert
        expect(result.toArray().length).toBe(0);
    });
    
    it('should only return matching elements until predicate does not match', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);
        
        // Act
        var result = enumerable.takeWhile(function (i) {
            return i % 2 === 0;
        });
        
        // Assert
        expect(result.toArray()).toEqual([0]);
    });
    
});

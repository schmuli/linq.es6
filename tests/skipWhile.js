"use strict";

describe('Enumerable.prototype.skipWhile', function () {

    it('should throw error for invalid parameters', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);
        
        // Assert
        expect(function () {
            enumerable.skipWhile(null);
        }).toThrow();
    });
    
    it('should return empty for empty enumerable', function () {
        // Arrange
        var enumerable = Enumerable.empty();
        
        // Act
        var result = enumerable.skipWhile(function () {
            return true;
        });
        
        // Assert
        expect(result.toArray().length).toBe(0);
    });
    
    it('should only return elements once predicate does not match', function () {
        // Arrange
        var enumerable = [1,2,3,2,1].asEnumerable();
        
        // Act
        var result = enumerable.skipWhile(function (i) {
            return i < 3;
        });
        
        // Assert
        expect(result.toArray()).toEqual([3,2,1]);
    });    
    
});
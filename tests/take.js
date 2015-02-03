"use strict";

describe('Enumerable.prototype.take', function () {

    it('should throw error when parameter invalid', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);
        
        // Assert
        expect(function () {
            enumerable.take(-4);
        }).toThrow();
    });
    
    it('should return matching number of elements', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);
        
        // Act
        var result = enumerable.take(2);
        
        // Assert
        expect(result.toArray().length).toBe(2);
    });
    
});

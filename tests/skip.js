"use strict";

describe('Enumerable.prototype.skip', function () {

    it('should throw error for invalid parameters', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);
        
        // Assert
        expect(function () {
            enumerable.skip(-4);
        }).toThrow();
    });
    
    it('should skip matching number of elements', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);
        
        // Act
        var result = enumerable.skip(3);
        
        // Assert
        expect(result.toArray()).toEqual([3,4]);
    });
    
});

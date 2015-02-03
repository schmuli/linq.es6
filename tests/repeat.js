"use strict";

describe('Enumerable.repeat', function () {

    it('should throw when parameters invalid', function () {
        // Assert
        expect(function () {
            Enumerable.repeat({}, -4);
        }).toThrow();    
    });

    it('should use the provided value', function () {
        // Arrange
        var value = {};
        
        // Act
        var result = Enumerable.repeat(value, 1);
        
        // Assert
        expect(result.toArray()[0]).toBe(value);
    });
    
    it('should reuse the value for all elements', function () {
        // Arrange
        var value = {};
        
        // Act
        var result = Enumerable.repeat(value, 2).toArray();
        
        // Assert
        expect(result).toEqual([value, value]);
    });

});
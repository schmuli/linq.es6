"use strict";

describe('Enumerable.empty', function () {

    it('should return an empty enumerable', function () {
        // Arrange
        var enumerable = Enumerable.empty();
        
        // Act
        var result = enumerable.toArray();
        
        // Assert
        expect(result.length).toBe(0);
    });
    
});

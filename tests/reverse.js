"use strict";

describe('Enumerable.prototype.reverse', function () {

    it('should reverse the elements in the enumerable', function () {
        // Arrange
        var enumerable = Enumerable.range(0, 5);
        
        // Act
        var result = enumerable.reverse();
        
        // Assert
        expect(result.toArray()).toEqual([4,3,2,1,0]);
    });

});

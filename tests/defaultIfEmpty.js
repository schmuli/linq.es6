"use strict";

describe('Enumerable.prototype.defaultIfEmpty', function () {

	it('should return the default value for empty enumerable', function () {
		// Arrange
		var enumerable = Enumerable.empty();

		// Act
		var result = enumerable.defaultIfEmpty(42).toArray();

		expect(result.length).toBe(1);
		expect(result[0]).toBe(42);
	});

	it('should accept an undefined value as the default value', function () {
		// Arrange
		var enumerable = Enumerable.empty();

		// Act
		var result = enumerable.defaultIfEmpty().toArray();

		expect(result.length).toBe(1);
		expect(result[0]).toBeUndefined();
	});

	it('should return all values for non-empty enumerable', function () {
		// Arrange
		var enumerable = Enumerable.range(0, 5);

		// Act
		var result = enumerable.defaultIfEmpty(42).toArray();

		// Assert
		expect(result.length).toBe(5);
	});

});

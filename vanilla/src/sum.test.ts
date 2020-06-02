import sum from "./sum";

describe('sum', () => {
  it('should sum 2 + 3 = 5', () => {
    // Arrange
    const a = 2;
    const b = 3;
    const five = 5;

    // Act
    const result = sum(a, b);

    console.log('result', result);

    // Assert
    expect(result).toBe(five);
  });

  describe('negative numbers', () => {
    it('should sum 2 + (-3) = -1', () => {
      // Arrange
      const a = 2;
      const b = -3;

      // Act
      const result = sum(a, b);

      // Assert
      expect(result).toBe(-1);
    });
  });

  describe('NaN', () => {
    // it() === test()
    test('should be weird with NaN', () => {
      // Arrange
      const a = 2;
      const b = NaN;

      // Act
      const result = sum(a, b);

      // Assert
      expect(result).toBe(NaN);
    });
  });
});
